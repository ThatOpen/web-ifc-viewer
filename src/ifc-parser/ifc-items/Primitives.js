import { vocabulary as v } from "../lexer/lexer.js";

function addPrimitiveParsers($) {
  $.RULE("IdSet", IdSet_Parser($));
  $.RULE("IfcText", IfcText_Parser($));
  $.RULE("IfcExpressId", IfcExpressId_Parser($));
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
  };
}

export { addPrimitiveParsers };
