import { Injectable } from '@angular/core';
import { FormSchema } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  formStructure: FormSchema = {
    "type": "object",
    "layout": [
      {
        "type": "layout",
        "items": [
          {
            "type": "layout",
            "items": [
              "firstName",
              "lastName",
              "email",
              "phone"
            ],
            "config": {
              "columns": [
                {
                  "width": 6,
                  "content": [
                    0,
                    2
                  ]
                },
                {
                  "width": 6,
                  "content": [
                    1,
                    3
                  ]
                }
              ],
              "innerPageLayout": false
            },
            "widget": {
              "type": "dtl-fluent-columns"
            }
          }
        ],
        "widget": {
          "type": "dtl-fluent-card"
        }
      },
      {
        "type": "layout",
        "items": [
          {
            "type": "layout",
            "items": [
              "position",
              "experience",
              "motivation",
              "education",
              "cvLink",
              "strengths",
              "startDate"
            ],
            "widget": {
              "type": "dtl-fluent-card"
            }
          }
        ],
        "config": {
          "columns": [
            {
              "width": 12,
              "content": [
                0,
                1,
                2,
                3,
                4,
                5,
                6
              ]
            }
          ]
        },
        "widget": {
          "type": "dtl-fluent-section"
        }
      }
    ],
    "widget": {
      "type": "dtl-fluent-section"
    },
    "properties": {
      "email": {
        "type": "string",
        "title": "E-mailová adresa",
        "widget": {
          "type": "text",
          "validationMessages": {
            "pattern": "Zadejte platnou e-mailovou adresu"
          }
        },
        "pattern": "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
        "config": {}
      },
      "phone": {
        "type": "string",
        "title": "Telefonní číslo",
        "widget": {
          "type": "text",
          "validationMessages": {}
        },
        "pattern": "^\\+?[0-9]{1,3}?[0-9]{6,14}$",
        "config": {},
        "localizationData": {
          "en": {
            "title": "",
            "widget": {
              "tooltip": "",
              "placeholder": ""
            }
          }
        }
      },
      "cvLink": {
        "type": "string",
        "title": "Odkaz na životopis",
        "widget": {
          "type": "text"
        }
      },
      "position": {
        "type": "string",
        "oneOf": [
          {
            "const": "Angular vývojář",
            "title": "Angular vývojář"
          },
          {
            "const": "Kotlin vývojář",
            "title": "Kotlin vývojář"
          },
          {
            "const": "Analytik",
            "title": "Analytik"
          }
        ],
        "title": "Pozice, o kterou se ucházíte",
        "config": {},
        "widget": {
          "type": "select",
          "validationMessages": {}
        }
      },
      "lastName": {
        "type": "string",
        "title": "Příjmení",
        "widget": {
          "type": "text",
          "validationMessages": {}
        },
        "config": {}
      },
      "education": {
        "type": "string",
        "oneOf": [
          {
            "const": "Základní škola",
            "title": "Základní škola"
          },
          {
            "const": "Střední škola",
            "title": "Střední škola"
          },
          {
            "const": "Vysoká škola",
            "title": "Vysoká škola"
          }
        ],
        "title": "Dosažené vzdělání",
        "config": {},
        "widget": {
          "type": "select",
          "validationMessages": {}
        }
      },
      "firstName": {
        "type": "string",
        "title": "Jméno",
        "widget": {
          "type": "text",
          "validationMessages": {}
        },
        "config": {}
      },
      "startDate": {
        "type": "string",
        "title": "Kdy můžete nastoupit?",
        "widget": {
          "type": "date"
        }
      },
      "strengths": {
        "type": "string",
        "title": "Jaké jsou vaše největší přednosti?",
        "widget": {
          "type": "textarea"
        }
      },
      "experience": {
        "type": "string",
        "title": "Pracovní zkušenosti",
        "widget": {
          "type": "textarea"
        }
      },
      "motivation": {
        "type": "string",
        "title": "Proč chcete pracovat na této pozici?",
        "widget": {
          "type": "textarea"
        }
      }
    },
    "required": [
      "firstName",
      "lastName",
      "email",
      "phone"
    ]
  };

  getFormStructure(): FormSchema {
    return this.formStructure;
  }
}
