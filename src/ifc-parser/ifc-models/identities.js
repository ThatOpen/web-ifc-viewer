import { newObject } from "../parser/parser-map.js";
import { ifcClass } from "../../utils/globalProperties.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [ifcClass]: getName(t.IfcApplication),
  ApplicationDeveloper: d.id,
  Version: d.text,
  ApplicationFullName: d.text,
  ApplicationIdentifier: d.text,
});

newObject({
  [ifcClass]: getName(t.IfcOrganization),
  Identification: d.text,
  Name: d.text,
  Description: d.text,
  Roles: d.idSet,
  Addresses: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcOwnerHistory),
  OwningUser: d.id,
  OwningApplication: d.id,
  State: d.enum,
  ChangeAction: d.enum,
  LastModifiedDate: d.date,
  LastModifyingUser: d.id,
  LastModifyingApplication: d.id,
  CreationDate: d.date,
});

newObject({
  [ifcClass]: getName(t.IfcPerson),
  Identification: d.text,
  FamilyName: d.text,
  GivenName: d.text,
  MiddleNames: d.textSet,
  PrefixTitles: d.textSet,
  SuffixTitles: d.textSet,
  Roles: d.idSet,
  Addresses: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcPersonAndOrganization),
  ThePerson: d.id,
  TheOrganization: d.id,
  Roles: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcPostalAddress),
  Purpose: d.enum,
  Description: d.text,
  UserDefinedPurpose: d.text,
  InternalLocation: d.text,
  AddressLines: d.textSet,
  PostalBox: d.text,
  Town: d.text,
  Region: d.text,
  PostalCode: d.text,
  Country: d.text,
});
