provider "aws" {
  region = "ap-south-1"
}

# -------------------------
# S3 Bucket (Workspace based)
# -------------------------
resource "aws_s3_bucket" "my_bucket" {
  bucket = terraform.workspace == "dev" ? "myappdev-999" : "myappprod-999"

  lifecycle {
    prevent_destroy = true
  }
}

# -------------------------
# Block Public Access (PRIVATE BUCKET)
# -------------------------
resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.my_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# -------------------------
# Upload build files
# -------------------------
resource "aws_s3_object" "build_files" {
  for_each = fileset("build", "**")

  bucket = aws_s3_bucket.my_bucket.id
  key    = each.value
  source = "build/${each.value}"

  etag = filemd5("build/${each.value}")
}

# -------------------------
# CloudFront Origin Access Control (OAC)
# -------------------------
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "s3-oac"
  description                       = "OAC for S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# -------------------------
# CloudFront Distribution
# -------------------------
resource "aws_cloudfront_distribution" "cdn" {

  origin {
    domain_name = aws_s3_bucket.my_bucket.bucket_regional_domain_name
    origin_id   = "s3-origin"

    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  enabled = true

  default_root_object = "index.html"

  default_cache_behavior {
    target_origin_id = "s3-origin"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    viewer_protocol_policy = "redirect-to-https"

    min_ttl     = 0
    default_ttl = 86400
    max_ttl     = 86400

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

# -------------------------
# S3 Bucket Policy (CloudFront only access)
# -------------------------
resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.my_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "cloudfront.amazonaws.com"
      }
      Action   = "s3:GetObject"
      Resource = "${aws_s3_bucket.my_bucket.arn}/*"
    }]
  })
}

# -------------------------
# Outputs
# -------------------------
output "cloudfront_url" {
  value = aws_cloudfront_distribution.cdn.domain_name
}

output "s3_url" {
  value = "http://${aws_s3_bucket.my_bucket.bucket}.s3-website.ap-south-1.amazonaws.com"
}