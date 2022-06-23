import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { IFCBUILDING, IFCBUILDINGSTOREY, IFCUNITASSIGNMENT } from 'web-ifc';

export class StoreyManager {
  list: { [modelID: number]: any[] } = [];
  loader?: IFCLoader;

  private unitsFactor: { [name: string]: number } = {
    MILLI: 0.001,
    CENTI: 0.01,
    DECI: 0.1
  };

  private loaderError = 'Loader must be defined!';

  dispose() {
    (this.list as any) = null;
    (this.unitsFactor as any) = null;
  }

  async getAbsoluteElevation(modelID: number) {
    if (!this.loader) throw new Error(this.loaderError);

    await this.getCurrentStoreys(modelID);
    const unitsScale = await this.getUnitsFactor(modelID);
    const siteCoords = await this.getSiteCoords(modelID);
    const transformHeight = await this.getTransformHeight(modelID);
    const storeys = this.list[modelID];

    const result: { [name: string]: number } = {};

    for (let i = 0; i < storeys.length; i++) {
      const storey = storeys[i];
      const baseHeight = storey.Elevation.value;
      const name = this.getStoreyName(storey);
      result[name] = (baseHeight + siteCoords[2]) * unitsScale + transformHeight;
    }

    return result;
  }

  private async getCurrentStoreys(modelID: number) {
    if (!this.list[modelID]) {
      this.list[modelID] = await this.loader!.ifcManager.getAllItemsOfType(
        modelID,
        IFCBUILDINGSTOREY,
        true
      );
    }
  }

  private async getSiteCoords(modelID: number) {
    try {
      const building = await this.getBuilding(modelID);
      const sitePlace = building.ObjectPlacement.PlacementRelTo.RelativePlacement.Location;
      return sitePlace.Coordinates.map((coord: any) => coord.value);
    } catch (e) {
      return [0, 0, 0];
    }
  }

  private async getBuilding(modelID: number) {
    const allBuildingsIDs = await this.loader!.ifcManager.getAllItemsOfType(
      modelID,
      IFCBUILDING,
      false
    );

    const buildingID = allBuildingsIDs[0];
    return this.loader!.ifcManager.getItemProperties(modelID, buildingID, true);
  }

  private async getTransformHeight(modelID: number) {
    const transformMatrix = await this.loader!.ifcManager.ifcAPI.GetCoordinationMatrix(modelID);
    return transformMatrix[13];
  }

  private getStoreyName(storey: any) {
    if (storey.Name) return storey.Name.value;
    if (storey.LongName) return storey.LongName.value;
    return storey.GlobalId;
  }

  // TODO: This assumes the first unit is the length, which is true in most cases
  // Might need to fix this in the future
  private async getUnitsFactor(modelID: number) {
    const allUnitsIDs = await this.loader!.ifcManager.getAllItemsOfType(
      modelID,
      IFCUNITASSIGNMENT,
      false
    );

    const unitsID = allUnitsIDs[0];
    const unitsProps = await this.loader!.ifcManager.getItemProperties(modelID, unitsID);
    const lengthUnitID = unitsProps.Units[0].value;
    const lengthUnit = await this.loader!.ifcManager.getItemProperties(modelID, lengthUnitID);
    const prefix = lengthUnit.Prefix?.value;
    return this.unitsFactor[prefix] || 1;
  }
}
