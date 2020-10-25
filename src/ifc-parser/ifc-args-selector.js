const IfcArgsSubtractor = (args, index) => {
  return args.slice(0, args.length - index);
};

const IfcArgsSelector = (args, index) => {
  return args[args.length - index];
};

module.exports = { IfcArgsSubtractor, IfcArgsSelector };
