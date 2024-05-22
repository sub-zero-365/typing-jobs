interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_dev_server_url: string;
    readonly VITE_APP_prod_server_url: string;
    readonly VITE_APP_APP_NAME: string;
    readonly VITE_APP_phone_number: string;
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  