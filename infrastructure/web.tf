provider "aws" {
  region  = "us-east-1"
  version = "~> 1.54"
}

resource "aws_s3_bucket" "tatarana-web" {
  bucket = "tatarana-web"
  acl    = "public-read"

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_object" "tatarana-web-index" {
  bucket = "tatarana-web"
  acl    = "public-read"
  key    = "index.html"
  source = "../web/index.html"
  etag   = "${md5(file("../web/index.html"))}"
  content_type = "text/html"
}

resource "aws_s3_bucket_object" "tatarana-web-bundle" {
  bucket = "tatarana-web"
  acl    = "public-read"
  key    = "dist/bundle.js"
  source = "../web/dist/bundle.js"
  etag   = "${md5(file("../web/dist/bundle.js"))}"
  content_type = "application/json"
}
