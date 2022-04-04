import { IfcComponent } from '../../base-types';
import { IfcManager } from '../ifc';
import { IfcContext } from '../context';

type dbChooserResponse = {
  id: string;
  name: string;
  link: string;
  bytes: number;
  icon: string;
  thumbnailLink: string;
  isDir: boolean;
};

declare const Dropbox: any;

export class DropboxAPI extends IfcComponent {
  private tid?: any;
  private counter: number;
  private loader: IfcManager;

  constructor(context: IfcContext, loader: IfcManager) {
    super(context);
    this.loader = loader;
    this.counter = 0;
  }

  initializeAPI() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
    script.id = 'dropboxjs';
    script.setAttribute('data-app-key', 'iej3z16hhyca35a');
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  loadDropboxIfc() {
    this.openDropboxChooser(this.getOptions());
  }

  openDropboxChooser(options: any) {
    try {
      if (Dropbox) {
        Dropbox.choose(this.getOptions());
        return clearTimeout(this.tid);
      }
    } catch (error) {
      if (this.counter++ > 9) return this.errorOnConnection();
      this.tid = setTimeout(() => this.openDropboxChooser(options), 2000);
    }
    return null;
  }

  private errorOnConnection() {
    console.error('Error: could not communicate with dropbox');
    clearTimeout(this.tid);
  }

  private onDBChooserSuccess = async (files: dbChooserResponse[]) => {
    const rawResponse = await fetch(files[0].link);
    const result = await rawResponse.text();
    const ifcBlob = new Blob([result], { type: 'text/plain' });
    const file = new File([ifcBlob], 'ifcFile');
    this.loader.loadIfc(file);
  };

  private getOptions = () => {
    return {
      success: this.onDBChooserSuccess,
      cancel: this.onDBChooserCancel,
      linkType: 'direct',
      multiselect: false,
      extensions: ['.ifc'],
      folderselect: false
    };
  };

  private onDBChooserCancel(_files: dbChooserResponse[]) {
    console.log('Canceled!');
  }
}
