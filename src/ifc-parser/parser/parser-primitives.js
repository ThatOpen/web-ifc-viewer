import { vocabulary as v } from '../lexer/lexer.js';
import { ifcDataTypes as d } from '../../utils/ifc-data-types.js';

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
  [d.asterisk]: Asterisk_Parser,
  [d.number]: Number_Parser,
  [d.date]: Number_Parser,
  [d.text]: IfcText_Parser,
  [d.bool]: IfcBool_Parser,
  [d.enum]: IfcEnum_Parser,
  [d.id]: IfcExpressId_Parser,
  [d.idSet]: IdSet_Parser,
  [d.numSet]: NumberSet_Parser,
  [d.value]: IfcValue_Parser,
  [d.valueSet]: ValueSet_Parser,
  [d.textSet]: TextSet_Parser
};

function getParser(dataType) {
  return primitiveParsers[dataType].name;
}

function Asterisk_Parser($) {
  return () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(v[d.asterisk]);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.default]);
        }
      }
    ]);
    $.OPTION(() => {
      $.CONSUME(v.Comma);
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
                $.CONSUME(v[d.number]);
              }
            },
            {
              ALT: () => {
                $.CONSUME(v[d.text]);
              }
            },
            {
              ALT: () => {
                $.CONSUME(v[d.bool]);
              }
            },
            {
              ALT: () => {
                $.CONSUME(v[d.enum]);
              }
            }
          ]);
          $.CONSUME(v.ClosePar);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.id]);
        }
      },
      {
        ALT: () => {
          $.CONSUME2(v[d.number]);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.default]);
        }
      }
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
          $.CONSUME(v[d.default]);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.number]);
        }
      }
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
            $.CONSUME(v[d.number]);
            $.OPTION(() => {
              $.CONSUME(v.Comma);
            });
          });
          $.CONSUME(v.ClosePar);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.default]);
        }
      }
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
            $.CONSUME(v[d.text]);
            $.OPTION(() => {
              $.CONSUME(v.Comma);
            });
          });
          $.CONSUME(v.ClosePar);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.default]);
        }
      }
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
            $.CONSUME(v[d.id]);
            $.OPTION(() => {
              $.CONSUME(v.Comma);
            });
          });
          $.CONSUME(v.ClosePar);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.default]);
        }
      }
    ]);
    $.OPTION2(() => {
      $.CONSUME2(v.Comma);
    });
  };
}

function ValueSet_Parser($) {
  return () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(v.OpenPar);

          $.MANY(() => {
            $.SUBRULE($.IfcValue_Parser);
            $.OPTION(() => {
              $.CONSUME(v.Comma);
            });
          });
          $.CONSUME(v.ClosePar);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.default]);
        }
      }
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
          $.CONSUME(v[d.default]);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.text]);
        }
      }
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
          $.CONSUME(v[d.bool]);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.default]);
        }
      }
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
          $.CONSUME(v[d.enum]);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.default]);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.asterisk]);
        }
      }
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
          $.CONSUME(v[d.id]);
        }
      },
      {
        ALT: () => {
          $.CONSUME(v[d.default]);
        }
      }
    ]);
    $.OPTION2(() => {
      $.CONSUME(v.Comma);
    });
  };
}

export { addPrimitiveParsers, primitiveParsers, getParser };
