import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IfcService } from '../services/ifc.service';

interface ifcProperty {
  [key: string]: string;
}

interface ifcPropertyGroup {
  name: string;
  description: string;
  props: ifcProperty[];
}

@Component({
  selector: 'app-property-menu',
  templateUrl: './property-menu.component.html',
  styleUrls: ['./property-menu.component.css']
})
export class PropertyMenuComponent implements OnInit {
  dataSources: MatTableDataSource<ifcProperty>[] = [];
  properties: ifcPropertyGroup[] = [
    {
      name: '01',
      description: 'Hello!',
      props: [
        { name: 'asdf', value: 'asdf' },
        { name: 'asdf', value: 'asdf' },
        { name: 'asdf', value: 'asdf' },
        { name: 'asdf', value: 'asdf' }
      ]
    },
    {
      name: '02',
      description: 'Hello!',
      props: [
        { name: 'asdf', value: 'asdf' },
        { name: 'asdf', value: 'asdf' },
        { name: 'asdf', value: 'asdf' },
        { name: 'asdf', value: 'asdf' }
      ]
    }
  ];

  ifc: IfcService;

  constructor(service: IfcService) {
    this.ifc = service;
    this.ifc.subscribeOnSelect(this.updateProperties);
    this.dataSources = this.properties.map((p) => {
      const source = new MatTableDataSource<ifcProperty>();
      source.data = p.props;
      return source;
    });
  }

  ngOnInit(): void {}

  updateProperties = (modelID: number, id: number) => {
    if (modelID == null || id == null) return;
    const props = this.ifc.ifcViewer?.getProperties(modelID, id, true);
    this.properties.length = 0;
    this.dataSources = [];
    const allGroups = this.getPropertyGroups(props);
    this.properties.push(...allGroups);
    this.dataSources = this.properties.map((p) => {
      const source = new MatTableDataSource<ifcProperty>();
      source.data = p.props;
      return source;
    });
  };

  getPropertyGroups(props: any): ifcPropertyGroup[] {
    const psets = props.psets.map((p: any) => {
      return { name: 'Property set', description: 'Properties defined by the user', props: this.getProps(p) };
    });
    delete props.psets;
    const type = props.type.map((p: any) => {
      return { name: 'Type properties', description: 'Properties defined by the type of element', props: this.getProps(p) };
    });
    delete props.type;
    props = {
      name: 'Native properties',
      description: 'Properties contained in the IFC class',
      props: this.getProps(props)
    };
    return [props, ...psets, ...type];
  }

  getProps(props: any) {
    for (let i in props) {
      props[i] = this.getProp(props[i]);
    }
    return Object.keys(props).map((p) => {
      return { name: p, value: props[p] };
    });
  }

  getProp(prop: any) {
    if (prop == null || prop == undefined) return 'undefined';
    if (prop.value != undefined) return '' + prop.value;
    if (typeof prop == 'number') return '' + prop;
    return 'undefined';
  }
}
