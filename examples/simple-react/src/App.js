import './App.css';
import { Axes, ClippingComponent, Grid, Viewer } from 'web-ifc-viewer';
import { Backdrop, Box, CircularProgress, IconButton } from '@material-ui/core';
import React from 'react';
import Dropzone from 'react-dropzone';
import BcfDialog from './components/BcfDialog';

//Icons
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import CropIcon from '@material-ui/icons/Crop';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import { SpatialHierarchy } from './components/SpatialHierarchy';

class App extends React.Component {

    state = {
        bcfDialogOpen: false,
        loaded: false,
        loading_ifc: false
    };

    constructor(props) {
        super(props);
        this.dropzoneRef = React.createRef();
    }

    componentDidMount() {
        const container = document.getElementById('viewer-container');
        const viewer = new Viewer(container);
        viewer.ifcLoader.setWasmPath('../../');

        this.grid = new Grid(viewer, 100, 100);
        this.axes = new Axes(viewer);
        this.clipping = new ClippingComponent(viewer);

        this.viewer = viewer;
    }

    onDrop = async (files) => {
        this.setState({ loading_ifc: true })
        await this.viewer.loadIfc(files[0], true);
        this.setState({ loaded: true, loading_ifc: false })
    };

    handleToggleClipping = () => {
        this.clipping.active = !this.clipping.active;
    };

    handleClickOpen = () => {
        this.dropzoneRef.current.open();
    };

    handleOpenBcfDialog = () => {
        this.setState({
            ...this.state,
            bcfDialogOpen: true
        });
    };

    handleCloseBcfDialog = () => {
        this.setState({
            ...this.state,
            bcfDialogOpen: false
        });
    };

    handleOpenViewpoint = (viewpoint) => {
        this.viewer.currentViewpoint = viewpoint;
    };

    render() {
        return (
          <>
              <BcfDialog
                open={this.state.bcfDialogOpen}
                onClose={this.handleCloseBcfDialog}
                onOpenViewpoint={this.handleOpenViewpoint}
              />
              <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
                  <aside style={{ width: 50 }}>
                      <IconButton onClick={this.handleClickOpen}>
                          <FolderOpenOutlinedIcon />
                      </IconButton>
                      <IconButton onClick={this.handleToggleClipping}>
                          <CropIcon />
                      </IconButton>
                      <IconButton onClick={this.handleOpenBcfDialog}>
                          <FeedbackOutlinedIcon />
                      </IconButton>
                  </aside>
                  {/*<Box width={400} p={2}>
                      {this.state.loaded && <SpatialHierarchy viewer={this.viewer}/> }
                  </Box>*/}
                  <Dropzone ref={this.dropzoneRef} onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                        </div>
                      )}
                  </Dropzone>
                  <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                      <div id='viewer-container' style={{ position: 'relative', height: '100%', width: '100%' }} />
                  </div>
              </div>
              <Backdrop
                style={{
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center"
                }}
                open={this.state.loading_ifc}
              >
                  <CircularProgress/>
              </Backdrop>
          </>
        );
    }
}

export default App;
