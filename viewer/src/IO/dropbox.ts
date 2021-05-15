import { Component } from '../components';
import { Viewer } from '../core';

type dbChooserResponse = {
  id: string;
  name: string;
  link: string;
  bytes: number;
  icon: string;
  thumbnailLink: string;
  isDir: boolean;
};

export class DropboxAPI extends Component {

  constructor(viewer: Viewer) {
    super(viewer);
    this.initializeAPI();
  }

  loadDropboxIfc() {
    //@ts-ignore
    Dropbox.choose(this.chooserOptions);
  }

  private onDBChooserSuccess = async (files: dbChooserResponse[]) => {
    const rawResponse = await fetch(files[0].link);
    const result = await rawResponse.text();
    const ifcBlob = new Blob([result], {type: 'text/plain'});
    const ifcFile = new File([ifcBlob], "ifcFile");
    this.viewer.loadIfc(ifcFile);
  }

  private chooserOptions: object = {
    success: this.onDBChooserSuccess,
    cancel: this.onDBChooserCancel,
    linkType: 'direct',
    multiselect: false,
    extensions: ['.ifc'],
    folderselect: false
  };

  private onDBChooserCancel(files: dbChooserResponse[]) {
    console.log('Canceled!');
  }

  private initializeAPI() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
    script.id = 'dropboxjs';
    script.setAttribute('data-app-key', 'iej3z16hhyca35a');
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
