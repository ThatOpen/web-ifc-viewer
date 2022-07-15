import { IFCUNITASSIGNMENT } from 'web-ifc';
import { IfcManager } from './ifc-manager';

export enum UnitType {
  LENGTHUNIT = 'LENGTHUNIT',
  AREAUNIT = 'AREAUNIT',
  VOLUMEUNIT = 'VOLUMEUNIT'
}

export const UnitScale: { [unit: string]: number } = {
  MILLI: 0.001,
  CENTI: 0.01,
  DECI: 0.1,
  NONE: 1,
  DECA: 10,
  HECTO: 100,
  KILO: 1000
};

export class IfcUnits {
  allUnits: { [modelID: number]: any } = {};
  private ifc: IfcManager;

  constructor(ifc: IfcManager) {
    this.ifc = ifc;
  }

  dispose() {
    (this.allUnits as any) = null;
    (this.ifc as any) = null;
  }

  async getUnits(modelID: number, type: UnitType) {
    if (!this.allUnits[modelID]) {
      await this.getUnitsOfModel(modelID);
    }
    return this.allUnits[modelID][type];
  }

  async getUnitsOfModel(modelID: number) {
    this.allUnits[modelID] = {};

    const foundUnitsID = await this.ifc.getAllItemsOfType(modelID, IFCUNITASSIGNMENT, false);
    const unitsID = foundUnitsID[0];
    const unitReference = await this.ifc.getProperties(modelID, unitsID, false, true);
    const units = unitReference.Units;

    Object.values(UnitType).forEach((value) => {
      const foundUnit = units.find((item: any) => item.UnitType && item.UnitType.value === value);
      if (foundUnit) {
        const prefix = foundUnit.Prefix as any;
        let scale;
        if (prefix === null || prefix === undefined) scale = UnitScale.NONE;
        else scale = UnitScale[prefix.value];
        this.allUnits[modelID][value] = scale;
      }
    });
  }
}
