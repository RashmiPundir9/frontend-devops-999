output "cloudfront_url" {
  value = aws_cloudfront_distribution.cdn.domain_name
}

output "s3_url" {
  value = "http://${aws_s3_bucket.my_bucket.bucket}.s3-website.ap-south-1.amazonaws.com"
}