import { vocabulary as v } from "../lexer/lexer.js";

function addPrimitiveParsers($) {
  $.RULE("_IfcGuid", IfcGuid_Parser($));
  $.RULE("_Asterisk", Asterisk_Parser($));
  $.RULE("_Number", Number_Parser($));
  $.RULE("_IfcText", IfcText_Parser($));
  $.RULE("_IfcEnum", IfcEnum_Parser($));
  $.RULE("_IfcExpressId", IfcExpressId_Parser($));
  $.RULE("_IdSet", IdSet_Parser($));
  $.RULE("_NumberSet", NumberSet_Parser($));
  $.RULE("_IfcValue", IfcValue_Parser($));
  $.RULE("_TextSet", TextSet_Parser($));
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
    $.AT_LEAST_ONE(() => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(v.DefaultValue);
          },
        },
        {
          ALT: () => {
            $.CONSUME(v.IfcMeasureValue);
            $.CONSUME(v.OpenPar);
            $.CONSUME(v.Number);
            $.CONSUME(v.ClosePar);
          },
        },
      ]);
      $.OPTION(() => {
        $.CONSUME(v.Comma);
      });
    });
  };
}

function Number_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
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
    });
    $.OPTION(() => {
      $.CONSUME(v.Comma);
    });
  };
}

function NumberSet_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
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
    });
    $.OPTION2(() => {
      $.CONSUME2(v.Comma);
    });
  };
}

function TextSet_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
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
    });
    $.OPTION2(() => {
      $.CONSUME2(v.Comma);
    });
  };
}

function IdSet_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
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
    });
    $.OPTION2(() => {
      $.CONSUME2(v.Comma);
    });
  };
}

function IfcText_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(v.EmptyText);
          },
        },
        {
          ALT: () => {
            $.CONSUME(v.Text);
          },
        },
        {
          ALT: () => {
            $.CONSUME(v.DefaultValue);
          },
        },
      ]);
    });
    $.OPTION2(() => {
      $.CONSUME(v.Comma);
    });
  };
}

function IfcEnum_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
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
    });
    $.OPTION2(() => {
      $.CONSUME(v.Comma);
    });
  };
}

function IfcExpressId_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
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
    });
    $.OPTION2(() => {
      $.CONSUME(v.Comma);
    });
  };
}

export { addPrimitiveParsers };
