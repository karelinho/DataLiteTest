export interface FormSchema {
    type: string;
    layout: Layout[];
    widget: Widget;
    properties: Properties;
    required: string[];
  }
  
  export interface Properties {
    [key: string]: FormItem;
  }
  
  export interface Layout {
    type: string;
    items: LayoutItem[];
    config?: any;
    widget: Widget;
  }
  
  export interface LayoutItem {
    type: string;
    items: string[];
    config?: any;
    widget: Widget;
  }
  
  export interface FormItem {
    type: string;
    title: string;
    widget: Widget;
    pattern?: string;
    config?: any;
    localizationData?: Object;
    oneOf?: OneOf[];
  }
  
  export interface Widget {
    type: string;
    validationMessages?: ValidationMessages;
  }
  
  export interface ValidationMessages {
    pattern?: string;
  }
  
  export interface OneOf {
    const: string;
    title: string;
  }
