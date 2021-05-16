import './App.css';
import { Axes, ClippingComponent, Grid, Viewer } from 'web-ifc-viewer';
import { IconButton } from '@material-ui/core';
import React from 'react';
import Dropzone from 'react-dropzone';

//Icons
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import CropIcon from '@material-ui/icons/Crop';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.dropzoneRef = React.createRef();
    }

    componentDidMount() {
        const container = document.getElementById("viewer-container");
        const viewer = new Viewer(container);
        viewer.ifcLoader.setWasmPath("../../");

        this.grid = new Grid(viewer, 100,100);
        this.axes = new Axes(viewer);
        this.clipping = new ClippingComponent(viewer);

        this.viewer = viewer;
    }

    onDrop = (files) => {
        this.viewer.loadIfc(files[0]);
    };

    handleToggleClipping = () => {
        this.clipping.active = !this.clipping.active;
    }

    handleClickOpen = () => {
        this.dropzoneRef.current.open()
    }

    render() {
        return (
          <div style={{ display: "flex", flexDirection: "row", height: "100vh"}}>
              <aside style={{ width: 50 }}>
                  <IconButton onClick={this.handleClickOpen}>
                      <FolderOpenIcon />
                  </IconButton>
                  <IconButton onClick={this.handleToggleClipping}>
                      <CropIcon />
                  </IconButton>
              </aside>
              <Dropzone ref={this.dropzoneRef} onDrop={this.onDrop}>
                  {({getRootProps, getInputProps}) => (
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                    </div>
                  )}
              </Dropzone>
              <div style={{ flex: "1 1 auto", border: "solid red 1px", minWidth: 0}}>
                  <div id="viewer-container" style={{ position: 'relative', height: "100%", width: "100%"}} />
              </div>
          </div>
        );
    }
}

export default App;
