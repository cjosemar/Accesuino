export interface Asset {
  id: string;
  type?: string;
  path?: string;
  mime?: string;
  links?: {
    full: string;
    thumb: string;
  };
}
