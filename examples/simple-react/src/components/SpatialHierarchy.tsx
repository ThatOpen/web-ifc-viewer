import { Viewer } from 'web-ifc-viewer';
import React, { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { StyledTreeItem, StyledTreeView } from './StyledTreeView';
import { SpatialStructureElement } from 'web-ifc-viewer/dist/lib/IfcLoader';
import { Box, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

interface SpatialHierarchyProps {
    viewer: Viewer
}

export const SpatialHierarchy: FunctionComponent<SpatialHierarchyProps> = (props) => {

    const { viewer } = props

    return (
        <StyledTreeView>
            {viewer.ifcLoader.getSpatialStructure().hasSpatialChildren.map((element: SpatialStructureElement, index) => (
                  <TreeNode key={index} viewer={viewer} element={element} />
            ))}
        </StyledTreeView>
    )
}

interface TreeNodeProps {
    viewer: Viewer,
    element: SpatialStructureElement
}

const TreeNode: FunctionComponent<TreeNodeProps> = (props) => {

    const { viewer, element } = props;

    const [visible, setVisible] = useState(true)

    /*// @ts-ignore */
    const name = element.Name.value;
    // @ts-ignore
    const id = element.GlobalId.value;

    const toggleVisibility = useCallback (
      (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          setVisible(!visible);
      }, [visible]
    );

    const label = useMemo(() => (
      <Box display="flex" p={0.2} alignItems="center" justifyContent='space-between' >
          <Tooltip title={name}>
              <Typography variant="caption" noWrap color={visible ? "inherit" : "textSecondary" }>{name}</Typography>
          </Tooltip>
          <Box display="flex" flexGrow={1} justifyContent="flex-end" ml={0.5}>
              <IconButton size='small' onClick={toggleVisibility}>
                  {visible ? <Visibility style={{ fontSize: "1rem" }}/> : <VisibilityOff  style={{ fontSize: "1rem" }} /> }
              </IconButton>
          </Box>
      </Box>
    ), [name, toggleVisibility, visible]);

    const childNodes = useMemo(() => {
        const childNodes: JSX.Element[] = []

        element?.hasSpatialChildren?.forEach((child) => {
            childNodes.push(
              // @ts-ignore
              <TreeNode key={child.GlobalId.value}  viewer={viewer} element={child}/>
            )
        })

        element?.hasChildren?.forEach((child) => {
            const data = viewer.ifcLoader.getItemProperties(child, false, false) as any;
            childNodes.push (
              // @ts-ignore
              <TreeNode key={data.GlobalId.value}  viewer={viewer} element={data}/>
            )
        })

        return childNodes;
    }, [element.hasChildren, element.hasSpatialChildren, viewer]);

    return (
      <StyledTreeItem nodeId={id} label={label}>
          {childNodes}
      </StyledTreeItem>
    )
}