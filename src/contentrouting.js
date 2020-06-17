export const contentroutingschema = {
    "properties": {
        "apiVersion": { type: "string", default: "extensions/v1beta1" },
        "kind": { type: "string", default: "Ingress" },
        metadata: {
            type: "object",
            title: "Content Routing Metadata",
            required: ["name"],
            properties: {
                "name": { type: "string", title: "Content Routing Name" },
                "namespace": { type: "string", title: "Namespace", default: "default" },
                "annotations": {
                    "type": "array",
                    "title": "annotation",
                    "items": {
                        type: "object",
                        "properties": {
                            "annotation": {
                                type: "string",
                                title: "annotation",
                                "enum": [
                                    "ingress.citrix.com/frontend-ip",
                                    "ingress.citrix.com/secure-port",
                                    "ingress.citrix.com/insecure-port",
                                    "ingress.citrix.com/insecure-termination",
                                    "ingress.citrix.com/secure-backend",
                                    "kubernetes.io/ingress.class",
                                    "ingress.citrix.com/secure-service-type",
                                    "ingress.citrix.com/insecure-service-type",
                                    "ingress.citrix.com/path-match-method",
                                    "ingress.citrix.com/deployment",
                                ]
                            },
                            "value": {type: "string"}
                        }
                    },
                }
            }
        },
        "spec": {
            "type": "object",
            "required": [
                "rules"
            ],
            "properties": {
                "hostname": {
                    "type": "array",
                    "description": "List of domain names that share the same route, default is '*'",
                    "minItems": 1,
                    "items": {
                        "type": "string",
                        "description": "Domain name"
                    }
                },
                "rules": {
                    "type": "array",
                    "description": "List Content routing rules with an action defined",
                    "minItems": 1,
                    "items": {
                        "type": "object",
                        "required": [
                            "name",
                            "action"
                        ],
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "A name to represent the rule, this is used as an identifier in content routing policy name in ADC",
                                "minLength": 1,
                                "maxLength": 20,
                                "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                            },
                            "match": {
                                "type": "array",
                                "description": "List of rules with same action",
                                "minItems": 1,
                                "items": {
                                    "type": "object",
                                    "anyOf": [
                                        {
                                            "required": [
                                                "path"
                                            ]
                                        },
                                        {
                                            "required": [
                                                "headers"
                                            ]
                                        },
                                        {
                                            "required": [
                                                "cookies"
                                            ]
                                        },
                                        {
                                            "required": [
                                                "queryParams"
                                            ]
                                        },
                                        {
                                            "required": [
                                                "method"
                                            ]
                                        },
                                        {
                                            "required": [
                                                "policyExpression"
                                            ]
                                        }
                                    ],
                                    "properties": {
                                        "path": {
                                            "type": "object",
                                            "description": "URL Path based content routing",
                                            "properties": {
                                                "prefix": {
                                                    "type": "string",
                                                    "description": "URL path matches the prefix expression"
                                                },
                                                "exact": {
                                                    "type": "string",
                                                    "description": "URL Path must match exact path"
                                                },
                                                "regex": {
                                                    "type": "string",
                                                    "description": "PCRE based regex expression for path matching"
                                                }
                                            }
                                        },
                                        "headers": {
                                            "type": "array",
                                            "description": "List of header for content routing - Must match all the rules- Treated as AND condition if more than 1 rule",
                                            "minItems": 1,
                                            "items": {
                                                "type": "object",
                                                "description": "Header details for content routing, Check for existence of a header or header name-value match",
                                                "properties": {
                                                    "headerName": {
                                                        "type": "object",
                                                        "description": "Header name based content routing, Here existence of header is used for routing",
                                                        "properties": {
                                                            "exact": {
                                                                "type": "string",
                                                                "description": "Header Name - treated as exact must exist"
                                                            },
                                                            "contains": {
                                                                "type": "string",
                                                                "description": "Header Name - A header must exist that contain the string the name"
                                                            },
                                                            "regex": {
                                                                "type": "string",
                                                                "description": "header Name - treated as PCRE regex expression"
                                                            },
                                                            "not": {
                                                                "type": "boolean",
                                                                "description": "Default False, if present, rules are inverted. I.e header name must not exist"
                                                            }
                                                        },
                                                        "oneOf": [
                                                            {
                                                                "required": [
                                                                    "exact"
                                                                ]
                                                            },
                                                            {
                                                                "required": [
                                                                    "contains"
                                                                ]
                                                            },
                                                            {
                                                                "required": [
                                                                    "regex"
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    "headerValue": {
                                                        "type": "object",
                                                        "description": "Header Name and Value based match",
                                                        "properties": {
                                                            "name": {
                                                                "type": "string",
                                                                "description": "Header name that must match the value"
                                                            },
                                                            "exact": {
                                                                "type": "string",
                                                                "description": "Header value - treated as exact"
                                                            },
                                                            "contains": {
                                                                "type": "string",
                                                                "description": "Header value - treated as contains"
                                                            },
                                                            "regex": {
                                                                "type": "string",
                                                                "description": "header value - treated as PCRE regex expression"
                                                            },
                                                            "not": {
                                                                "type": "boolean",
                                                                "description": "Default False, if present, rules are inverted. I.e header if present must not match the value"
                                                            }
                                                        },
                                                        "oneOf": [
                                                            {
                                                                "required": [
                                                                    "name",
                                                                    "exact"
                                                                ]
                                                            },
                                                            {
                                                                "required": [
                                                                    "name",
                                                                    "contains"
                                                                ]
                                                            },
                                                            {
                                                                "required": [
                                                                    "name",
                                                                    "regex"
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        },
                                        "queryParams": {
                                            "type": "array",
                                            "description": "List of Query parameters  for content routing - Must match all the rules- Treated as AND condition if more than 1 rule",
                                            "minItems": 1,
                                            "items": {
                                                "type": "object",
                                                "description": "Query parameters Name and Value based match",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "description": "Query name that must match the value. If no value is specified, matches with any value"
                                                    },
                                                    "exact": {
                                                        "type": "string",
                                                        "description": "Query value - Exact match"
                                                    },
                                                    "contains": {
                                                        "type": "string",
                                                        "description": "Query value - value must have the string(substring)"
                                                    },
                                                    "regex": {
                                                        "type": "string",
                                                        "description": "Query value - Value must match this regex patterm"
                                                    },
                                                    "not": {
                                                        "type": "boolean",
                                                        "description": "Default False, if present, rules are inverted. I.e query if present must not match the value"
                                                    }
                                                },
                                                "anyOf": [
                                                    {
                                                        "required": [
                                                            "name"
                                                        ]
                                                    },
                                                    {
                                                        "oneOf": [
                                                            {
                                                                "required": [
                                                                    "name",
                                                                    "exact"
                                                                ]
                                                            },
                                                            {
                                                                "required": [
                                                                    "name",
                                                                    "contains"
                                                                ]
                                                            },
                                                            {
                                                                "required": [
                                                                    "name",
                                                                    "regex"
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        "cookies": {
                                            "type": "array",
                                            "description": "List of Cookie params for content routing - Must match all the rules- Treated as AND condition if more than 1 rule",
                                            "minItems": 1,
                                            "items": {
                                                "type": "object",
                                                "description": "Cookie based routing",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "description": "cookie name that must match the value. If no value specified, it matches with any value"
                                                    },
                                                    "exact": {
                                                        "type": "string",
                                                        "description": "cookie value - treated as exact"
                                                    },
                                                    "contains": {
                                                        "type": "string",
                                                        "description": "cookie value - treated as substring"
                                                    },
                                                    "regex": {
                                                        "type": "string",
                                                        "description": "cookie value - treated as PCRE regex expression"
                                                    },
                                                    "not": {
                                                        "type": "boolean",
                                                        "description": "Default False, if present, rules are inverted. I.e cookie if present must not match the value"
                                                    }
                                                },
                                                "anyOf": [
                                                    {
                                                        "required": [
                                                            "name"
                                                        ]
                                                    },
                                                    {
                                                        "oneOf": [
                                                            {
                                                                "required": [
                                                                    "name",
                                                                    "exact"
                                                                ]
                                                            },
                                                            {
                                                                "required": [
                                                                    "name",
                                                                    "contains"
                                                                ]
                                                            },
                                                            {
                                                                "required": [
                                                                    "name",
                                                                    "regex"
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "method": {
                                                    "type": "string",
                                                    "description": "HTTP method for content routing eg: POST, PUT, DELETE etc"
                                                },
                                                "policyExpression": {
                                                    "type": "string",
                                                    "description": "Citrix ADC policy expressions; refer: https://docs.citrix.com/en-us/netscaler/media/expression-prefix.pdf"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "action": {
                                "type": "object",
                                "description": "Action for the matched rule",
                                "properties": {
                                    "backend": {
                                        "type": "object",
                                        "oneOf": [
                                            {
                                                "required": [
                                                    "kube"
                                                ]
                                            }
                                        ],
                                        "properties": {
                                            "kube": {
                                                "type": "object",
                                                "required": [
                                                    "service",
                                                    "port"
                                                ],
                                                "properties": {
                                                    "service": {
                                                        "description": "Name of the backend service",
                                                        "type": "string",
                                                        "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                                                    },
                                                    "port": {
                                                        "description": "Service port",
                                                        "type": "integer",
                                                        "minimum": 1,
                                                        "maximum": 65535
                                                    },
                                                    "backendConfig": {
                                                        "description": "General backend service options",
                                                        "properties": {
                                                            "secure_backend": {
                                                                "description": "Use Secure communications to the backends",
                                                                "type": "boolean"
                                                            },
                                                            "lbConfig": {
                                                                "description": "Citrix ADC LB vserver configurations for the backend. Refer: https://developer-docs.citrix.com/projects/netscaler-nitro-api/en/12.0/configuration/load-balancing/lbvserver/lbvserver/ for all configurations",
                                                                "type": "object",
                                                                "additionalProperties": {
                                                                    "type": "string"
                                                                }
                                                            },
                                                            "servicegroupConfig": {
                                                                "description": "Citrix ADC service group configurations for the backend; Refer: https://developer-docs.citrix.com/projects/netscaler-nitro-api/en/12.0/configuration/basic/servicegroup/servicegroup/ for all configurations",
                                                                "type": "object",
                                                                "additionalProperties": {
                                                                    "type": "string"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "redirect": {
                                        "type": "object",
                                        "oneOf": [
                                            {
                                                "required": [
                                                    "targetExpression"
                                                ]
                                            },
                                            {
                                                "required": [
                                                    "hostRedirect"
                                                ]
                                            },
                                            {
                                                "required": [
                                                    "httpsRedirect"
                                                ]
                                            }
                                        ],
                                        "properties": {
                                            "httpsRedirect": {
                                                "description": "Change the scheme from http to https keeping URL intact",
                                                "type": "boolean"
                                            },
                                            "hostRedirect": {
                                                "description": "Host name specified is used for redirection with URL intact",
                                                "type": "string"
                                            },
                                            "targetExpression": {
                                                "description": "A target can be specified using Citrix ADC policy expression",
                                                "type": "string"
                                            },
                                            "responseCode": {
                                                "description": "Default response code is 302, which can be customised using this attribute",
                                                "type": "integer",
                                                "minimum": 100,
                                                "maximum": 599
                                            }
                                        }
                                    }
                                },
                                "oneOf": [
                                    {
                                        "required": [
                                            "backend"
                                        ]
                                    },
                                    {
                                        "required": [
                                            "redirect"
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}

export const contentroutinguischema = {
    "metadata": {
        "annotations": {
            "ui:options": {
                orderable: false
            },
        },
    },
    "spec": {
        "rules": {
            "ui:order": ["name", "match", "action"],
            items: {
                "ui:order": ["name", "match", "action"],
                "host": {"ui:placeholder": "foo.com"}
            }
        }
    },
    "apiVersion": {"ui:disabled": true},
    "kind" : {"ui:disabled": true}
}