import { newObject } from '../parser/parser-map.js';
import { namedProps as n } from '../../utils/global-constants.js';
import { ifcDataTypes as d } from '../../utils/ifc-data-types.js';
import { getName, ifcTypes as t } from '../../utils/ifc-types.js';


newObject({
    [n.ifcClass]: getName(t.IfcDistributionPort),
    GlobalId: d.text,
    OwnerHistory: d.id,
    Name: d.text,
    Description: d.text,
    ObjectType: d.text,
    [n.objectPlacement]: d.id,
    [n.representation]: d.id,
    FlowDirection: d.enum
  });

  newObject({
    [n.ifcClass]: getName(t.IfcSystem),
    GlobalId: d.text,
    OwnerHistory: d.id,
    Name: d.text,
    Description: d.text,
    ObjectType: d.text,
  });

  