import { vocabulary as v } from "../lexer/lexer.js";

function addPrimitiveParsers($) {
  $.RULE("IfcGuid_Primitive", IfcGuid_Parser($));
  $.RULE("Number_Primitive", Number_Parser($));
  $.RULE("IfcText_Primitive", IfcText_Parser($));
  $.RULE("IfcEnum_Primitive", IfcEnum_Parser($));
  $.RULE("IfcExpressId_Primitive", IfcExpressId_Parser($));
  $.RULE("IdSet_Primitive", IdSet_Parser($));
  $.RULE("NumberSet_Primitive", NumberSet_Parser($));
}

function IfcGuid_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.IfcGuid);
      $.OPTION(() => {
        $.CONSUME(v.Comma);
      });
    });
  };
}

function Number_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.Number);
      $.OPTION(() => {
        $.CONSUME(v.Comma);
      });
    });
  };
}

function NumberSet_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.MANY(() => {
        $.CONSUME(v.Number);
        $.OPTION(() => {
          $.CONSUME(v.Comma);
        });
      });
      $.CONSUME(v.ClosePar);
    });
    $.OPTION2(() => {
      $.CONSUME2(v.Comma);
    });
  };
}

function IdSet_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.MANY(() => {
        $.CONSUME(v.ExpressId);
        $.OPTION(() => {
          $.CONSUME(v.Comma);
        });
      });
      $.CONSUME(v.ClosePar);
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
