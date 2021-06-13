import { Viewer } from 'web-ifc-viewer';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { StyledTreeItem, StyledTreeView } from './StyledTreeView';
import { Box, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Mesh } from 'three';
import { Display } from 'web-ifc-viewer/dist/lib/IFC/BaseDefinitions';

interface SpatialHierarchyProps {
    viewer: Viewer
}

export const SpatialHierarchy: FunctionComponent<SpatialHierarchyProps> = (props) => {

    const { viewer } = props

    return (
        <StyledTreeView>
            {viewer.ifcLoader.getSpatialStructure().hasSpatialChildren.map((element: any, index: number) => (
                  <TreeNode key={index} viewer={viewer} element={element}  overrideVisibility={null} />
            ))}
        </StyledTreeView>
    )
}

interface TreeNodeProps {
    viewer: Viewer,
    element: any,
    overrideVisibility: boolean | null
}

const TreeNode: FunctionComponent<TreeNodeProps> = (props) => {

    const { viewer, element, overrideVisibility } = props;

    const [visible, setVisible] = useState(true)

    const name = element.Name.value;
    const id = element.GlobalId.value;
    const expressId = element.expressID;
    
    const setVisibility = useCallback(
      (visible: boolean) => {
          const mesh = viewer.ifc_objects[0] as Mesh;
          const display: Display = {
              r: 0,
              g: 0,
              b: 0,
              a: visible ? 1 : 0,
              h: visible ? 0 : 1,
          }
          viewer.ifcLoader.setItemsDisplay([expressId], mesh, display, viewer.scene);
          setVisible(visible);
      },
      [expressId, viewer.ifcLoader, viewer.ifc_objects, viewer.scene]
    );

    const handleClickToggleVisibility = useCallback (
      (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          setVisibility(!visible);
      }, [setVisibility, visible]
    );

    useEffect(() => {
        if(overrideVisibility !== null){
            setVisibility(overrideVisibility);
        }
    }, [overrideVisibility, setVisibility]);

    const label = useMemo(() => (
      <Box display="flex" p={0.2} alignItems="center" justifyContent='space-between' >
          <Tooltip title={name}>
              <Typography variant="caption" noWrap color={visible ? "inherit" : "textSecondary" }>{name}</Typography>
          </Tooltip>
          <Box display="flex" flexGrow={1} justifyContent="flex-end" ml={0.5}>
              <IconButton size='small' onClick={handleClickToggleVisibility}>
                  {visible ? <Visibility style={{ fontSize: "1rem" }}/> : <VisibilityOff  style={{ fontSize: "1rem" }} /> }
              </IconButton>
          </Box>
      </Box>
    ), [name, handleClickToggleVisibility, visible]);

    const childNodes = useMemo(() => {
        const childNodes: JSX.Element[] = []

        element?.hasSpatialChildren?.forEach((child: any) => {
            childNodes.push(
              <TreeNode key={child.GlobalId.value}  viewer={viewer} element={child} overrideVisibility={visible} />
            )
        })

        element?.hasChildren?.forEach((child: any) => {
            const data = viewer.ifcLoader.getItemProperties(child, false) as any;
            childNodes.push (
              <TreeNode key={data.GlobalId.value}  viewer={viewer} element={data} overrideVisibility={visible} />
            )
        })

        return childNodes;
    }, [element?.hasChildren, element?.hasSpatialChildren, viewer, visible]);

    return (
      <StyledTreeItem nodeId={id} label={label}>
          {childNodes}
      </StyledTreeItem>
    )
}