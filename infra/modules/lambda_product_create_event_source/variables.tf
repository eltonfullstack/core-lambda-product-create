variable "api_gateway_path_part" {
    type = string
    description = "API Gateway path part"
}

variable "api_gateway_stage_name" {
    type = string
    description = "API Gateway stage name"
}

variable "api_gateway_http_method" {
    type = string
    description = "API Gateway http method"
}

variable "api_gateway_deployment_execution_arn" {    
    type = string
    description = "API Gateway deployment execution arn"
}

variable "lambda_project_name" {
    type = string
    description = "Lambda project name"
}