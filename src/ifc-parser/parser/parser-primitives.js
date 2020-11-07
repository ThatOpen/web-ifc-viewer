import { vocabulary as v } from "../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { parser } from "./parser.js";

//Basic syntactical structures (one structure per data type)

function addPrimitiveParsers($) {
  const parsers = [];
  Object.values(primitiveParsers).forEach((e) => {
    if (!parsers.includes(e)) {
      parsers.push(e);
      $.RULE(e.name, e($));
    }
  });
}

const primitiveParsers = {
  [d.guid]: IfcGuid_Parser,
  [d.asterisk]: Asterisk_Parser,
  [d.number]: Number_Parser,
  [d.date]: Number_Parser,
  [d.text]: IfcText_Parser,
  [d.bool]: IfcBool_Parser,
  [d.enum]: IfcEnum_Parser,
  [d.id]: IfcExpressId_Parser,
  [d.idSet]: IdSet_Parser,
  [d.numberSet]: NumberSet_Parser,
  [d.ifcValue]: IfcValue_Parser,
  [d.textSet]: TextSet_Parser,
};

function getParser(dataType) {
  return primitiveParsers[dataType];
}

function IfcGuid_Parser($) {
  return () => {
    $.CONSUME(v.IfcGuid);
    $.OPTION(() => {
      $.CONSUME(v.Comma);
    });
  };
}

function Asterisk_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(v.Asterisk);
          },
        },
        {
          ALT: () => {
            $.CONSUME(v.DefaultValue);
          },
        },
      ]);
      $.OPTION(() => {
        $.CONSUME(v.Comma);
      });
    });
    $.OPTION2(() => {
      $.CONSUME2(v.Comma);
    });
  };
}

function IfcValue_Parser($) {
  return () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(v.IfcValue);
          $.CONSUME(v.OpenPar);
          $.OR2([
            {
              ALT: () => {
                $.CONSUME(v.Number);
              },
            },
            {
              ALT: () => {
                $.CONSUME(v.Text);
              },
            },
            {
              ALT: () => {
                $.CONSUME(v.Boolean);
              },
            },
            {
              ALT: () => {
                $.CONSUME(v.Enum);
              },
            },
          ]);
          $.CONSUME(v.ClosePar);
        },
      },
      {
        ALT: () => {
          $.CONSUME(v.ExpressId);
        },
      },
      {
        ALT: () => {
          $.CONSUME2(v.Number);
        },
      },
      {
        ALT: () => {
          $.CONSUME(v.DefaultValue);
        },
      },
    ]);
    $.OPTION(() => {
      $.CONSUME(v.Comma);
    });
  };
}

function Number_Parser($) {
  return () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(v.DefaultValue);
        },
      },
      {
        ALT: () => {
          $.CONSUME(v.Number);
        },
      },
    ]);
    $.OPTION(() => {
      $.CONSUME(v.Comma);
    });
  };
}

function NumberSet_Parser($) {
  return () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(v.OpenPar);
          $.MANY(() => {
            $.CONSUME(v.Number);
            $.OPTION(() => {
              $.CONSUME(v.Comma);
            });
          });
          $.CONSUME(v.ClosePar);
        },
      },
      {
        ALT: () => {
          $.CONSUME(v.DefaultValue);
        },
      },
    ]);
    $.OPTION2(() => {
      $.CONSUME2(v.Comma);
    });
  };
}

function TextSet_Parser($) {
  return () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(v.OpenPar);
          $.MANY(() => {
            $.CONSUME(v.Text);
            $.OPTION(() => {
              $.CONSUME(v.Comma);
            });
          });
          $.CONSUME(v.ClosePar);
        },
      },
      {
        ALT: () => {
          $.CONSUME(v.DefaultValue);
        },
      },
    ]);
    $.OPTION2(() => {
      $.CONSUME2(v.Comma);
    });
  };
}

function IdSet_Parser($) {
  return () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(v.OpenPar);
          $.MANY(() => {
            $.CONSUME(v.ExpressId);
            $.OPTION(() => {
              $.CONSUME(v.Comma);
            });
          });
          $.CONSUME(v.ClosePar);
        },
      },
      {
        ALT: () => {
          $.CONSUME(v.DefaultValue);
        },
      },
    ]);
    $.OPTION2(() => {
      $.CONSUME2(v.Comma);
    });
  };
}

function IfcText_Parser($) {
  return () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(v.EmptyText);
        },
      },
      {
        ALT: () => {
          $.CONSUME(v.DefaultValue);
        },
      },
      {
        ALT: () => {
          $.CONSUME(v.Text);
        },
      },
    ]);
    $.OPTION2(() => {
      $.CONSUME(v.Comma);
    });
  };
}

function IfcBool_Parser($) {
  return () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(v.Boolean);
        },
      },
      {
        ALT: () => {
          $.CONSUME(v.DefaultValue);
        },
      },
    ]);
    $.OPTION2(() => {
      $.CONSUME(v.Comma);
    });
  };
}

function IfcEnum_Parser($) {
  return () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(v.Enum);
        },
      },
      {
        ALT: () => {
          $.CONSUME(v.DefaultValue);
        },
      },
    ]);
    $.OPTION2(() => {
      $.CONSUME(v.Comma);
    });
  };
}

function IfcExpressId_Parser($) {
  return () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(v.ExpressId);
        },
      },
      {
        ALT: () => {
          $.CONSUME(v.DefaultValue);
        },
      },
    ]);
    $.OPTION2(() => {
      $.CONSUME(v.Comma);
    });
  };
}

export { addPrimitiveParsers, primitiveParsers, getParser };
