class ifcFinder {
  constructor(ifcData) {
    this.ifcData = ifcData;
  }

  findByType(typeToFind) {
    return this.ifcData.filter((e) => e.type === typeToFind);
  }

  findFirstByType(typeToFind) {
    return this.findByType(typeToFind)[0];
  }

  findById(idToFind) {
    const foundItem = this.ifcData.find((e) => e.id === idToFind);
    return foundItem ? foundItem : idToFind;
  }
}

export { ifcFinder };
