import { vocabulary as v } from "../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
//Basic syntactical structures (one structure per data type)
function addPrimitiveParsers($: any) {
    const parsers: any = [];
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
    [d.textSet]: TextSet_Parser,
};
function getParser(dataType: any) {
    return primitiveParsers[dataType].name;
}
function Asterisk_Parser($: any) {
    return () => {
        $.AT_LEAST_ONE(() => {
            $.OR([
                {
                    ALT: () => {
                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        $.CONSUME(v[d.asterisk]);
                    },
                },
            ]);
            $.OPTION(() => {
                $.CONSUME((v as any).Comma);
            });
        });
    };
}
function IfcValue_Parser($: any) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    $.CONSUME((v as any).IfcValue);
                    $.CONSUME((v as any).OpenPar);
                    $.OR2([
                        {
                            ALT: () => {
                                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                $.CONSUME(v[d.number]);
                            },
                        },
                        {
                            ALT: () => {
                                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                $.CONSUME(v[d.text]);
                            },
                        },
                        {
                            ALT: () => {
                                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                $.CONSUME(v[d.bool]);
                            },
                        },
                        {
                            ALT: () => {
                                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                $.CONSUME(v[d.enum]);
                            },
                        },
                    ]);
                    $.CONSUME((v as any).ClosePar);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.id]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME2(v[d.number]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.default]);
                },
            },
        ]);
        $.OPTION(() => {
            $.CONSUME((v as any).Comma);
        });
    };
}
function Number_Parser($: any) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.default]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.number]);
                },
            },
        ]);
        $.OPTION(() => {
            $.CONSUME((v as any).Comma);
        });
    };
}
function NumberSet_Parser($: any) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    $.CONSUME((v as any).OpenPar);
                    $.MANY(() => {
                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        $.CONSUME(v[d.number]);
                        $.OPTION(() => {
                            $.CONSUME((v as any).Comma);
                        });
                    });
                    $.CONSUME((v as any).ClosePar);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME2((v as any).Comma);
        });
    };
}
function TextSet_Parser($: any) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    $.CONSUME((v as any).OpenPar);
                    $.MANY(() => {
                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        $.CONSUME(v[d.text]);
                        $.OPTION(() => {
                            $.CONSUME((v as any).Comma);
                        });
                    });
                    $.CONSUME((v as any).ClosePar);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME2((v as any).Comma);
        });
    };
}
function IdSet_Parser($: any) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    $.CONSUME((v as any).OpenPar);
                    $.MANY(() => {
                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        $.CONSUME(v[d.id]);
                        $.OPTION(() => {
                            $.CONSUME((v as any).Comma);
                        });
                    });
                    $.CONSUME((v as any).ClosePar);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME2((v as any).Comma);
        });
    };
}
function ValueSet_Parser($: any) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    $.CONSUME((v as any).OpenPar);
                    $.MANY(() => {
                        $.SUBRULE($.IfcValue_Parser);
                        $.OPTION(() => {
                            $.CONSUME((v as any).Comma);
                        });
                    });
                    $.CONSUME((v as any).ClosePar);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME2((v as any).Comma);
        });
    };
}
function IfcText_Parser($: any) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.default]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.text]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME((v as any).Comma);
        });
    };
}
function IfcBool_Parser($: any) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.bool]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME((v as any).Comma);
        });
    };
}
function IfcEnum_Parser($: any) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.enum]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME((v as any).Comma);
        });
    };
}
function IfcExpressId_Parser($: any) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.id]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(v[d.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME((v as any).Comma);
        });
    };
}
export { addPrimitiveParsers, primitiveParsers, getParser };
