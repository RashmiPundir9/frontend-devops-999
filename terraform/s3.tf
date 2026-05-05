resource "aws_s3_bucket" "my_bucket" {
  bucket = terraform.workspace == "dev" ? "myappdev-999" : "myappprod-999"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.my_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_object" "build_files" {
  for_each = fileset("build", "**")

  bucket = aws_s3_bucket.my_bucket.id
  key    = each.value
  source = "build/${each.value}"

  etag = filemd5("build/${each.value}")
}
