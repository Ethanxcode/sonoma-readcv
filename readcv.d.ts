declare module "readcv" {
  import * as React from "react";

  // Ghi đè: Cho RichText bất chấp React version
  export interface RichTextProps {
    text: string;
    className?: string;
  }

  // Tạm coi nó là 1 function component “any”
  export const RichText: React.FC<RichTextProps>;

  // Tương tự cho combineCollections, v.v.
  export function combineCollections(...args: any[]): any;
}
