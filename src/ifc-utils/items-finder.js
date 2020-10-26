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
    return this.ifcData.find((e) => e.id === idToFind);
  }
}

export { ifcFinder };
