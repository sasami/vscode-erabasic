import { CompletionItem, CompletionItemKind } from 'vscode';

function buildCompletionItems(objs: { label: string, kind: 'keyword' | 'control' | 'command' | 'function' | 'variable', detail?: string, documentation?: string }[]): CompletionItem[] {
    let kindTable = {
        'keyword': CompletionItemKind.Keyword,
        'control': CompletionItemKind.Keyword,
        'command': CompletionItemKind.Function,
        'function': CompletionItemKind.Function,
        'variable': CompletionItemKind.Variable,
    };
    return objs.map((obj) => {
        let item = new CompletionItem(obj.label, kindTable[obj.kind]);
        if (obj.detail !== undefined) {
            item.detail = obj.detail;
        }
        if (obj.documentation !== undefined) {
            item.documentation = obj.documentation;
        }
        return item;
    });
}

export let BuiltinComplationItems = buildCompletionItems([
    {
        label: 'PRINT',
        kind: 'command',
        detail: '文字列を表示',
    },
    {
        label: 'PRINTL',
        kind: 'command',
        detail: '文字列を表示+改行',
    },
    {
        label: 'PRINTW',
        kind: 'command',
        detail: '文字列を表示+待機',
    },
    {
        label: 'PRINTK',
        kind: 'command',
        detail: '文字列を表示+カナ強制',
    },
    {
        label: 'PRINTKL',
        kind: 'command',
        detail: '文字列を表示+カナ強制+改行',
    },
    {
        label: 'PRINTKW',
        kind: 'command',
        detail: '文字列を表示+カナ強制+待機',
    },
    {
        label: 'PRINTD',
        kind: 'command',
        detail: '文字列を表示+初期色',
    },
    {
        label: 'PRINTDL',
        kind: 'command',
        detail: '文字列を表示+初期色+改行',
    },
    {
        label: 'PRINTDW',
        kind: 'command',
        detail: '文字列を表示+初期色+待機',
    },
    {
        label: 'PRINTV',
        kind: 'command',
        detail: '数式を表示',
    },
    {
        label: 'PRINTVL',
        kind: 'command',
        detail: '数式を表示+改行',
    },
    {
        label: 'PRINTVW',
        kind: 'command',
        detail: '数式を表示+待機',
    },
    {
        label: 'PRINTVK',
        kind: 'command',
        detail: '数式を表示+カナ強制',
    },
    {
        label: 'PRINTVKL',
        kind: 'command',
        detail: '数式を表示+カナ強制+改行',
    },
    {
        label: 'PRINTVKW',
        kind: 'command',
        detail: '数式を表示+カナ強制+待機',
    },
    {
        label: 'PRINTVD',
        kind: 'command',
        detail: '数式を表示+初期色',
    },
    {
        label: 'PRINTVDL',
        kind: 'command',
        detail: '数式を表示+初期色+改行',
    },
    {
        label: 'PRINTVDW',
        kind: 'command',
        detail: '数式を表示+初期色+待機',
    },
    {
        label: 'PRINTS',
        kind: 'command',
        detail: '文字列式を表示',
    },
    {
        label: 'PRINTSL',
        kind: 'command',
        detail: '文字列式を表示+改行',
    },
    {
        label: 'PRINTSW',
        kind: 'command',
        detail: '文字列式を表示+待機',
    },
    {
        label: 'PRINTSK',
        kind: 'command',
        detail: '文字列式を表示+カナ強制',
    },
    {
        label: 'PRINTSKL',
        kind: 'command',
        detail: '文字列式を表示+カナ強制+改行',
    },
    {
        label: 'PRINTSKW',
        kind: 'command',
        detail: '文字列式を表示+カナ強制+待機',
    },
    {
        label: 'PRINTSD',
        kind: 'command',
        detail: '文字列式を表示+初期色',
    },
    {
        label: 'PRINTSDL',
        kind: 'command',
        detail: '文字列式を表示+初期色+改行',
    },
    {
        label: 'PRINTSDW',
        kind: 'command',
        detail: '文字列式を表示+初期色+待機',
    },
    {
        label: 'PRINTFORM',
        kind: 'command',
        detail: '書式付文字列を表示',
    },
    {
        label: 'PRINTFORML',
        kind: 'command',
        detail: '書式付文字列を表示+改行',
    },
    {
        label: 'PRINTFORMW',
        kind: 'command',
        detail: '書式付文字列を表示+待機',
    },
    {
        label: 'PRINTFORMK',
        kind: 'command',
        detail: '書式付文字列を表示+カナ強制',
    },
    {
        label: 'PRINTFORMKL',
        kind: 'command',
        detail: '書式付文字列を表示+カナ強制+改行',
    },
    {
        label: 'PRINTFORMKW',
        kind: 'command',
        detail: '書式付文字列を表示+カナ強制+待機',
    },
    {
        label: 'PRINTFORMD',
        kind: 'command',
        detail: '書式付文字列を表示+初期色',
    },
    {
        label: 'PRINTFORMDL',
        kind: 'command',
        detail: '書式付文字列を表示+初期色+改行',
    },
    {
        label: 'PRINTFORMDW',
        kind: 'command',
        detail: '書式付文字列を表示+初期色+待機',
    },
    {
        label: 'PRINTFORMS',
        kind: 'command',
        detail: '書式付文字列式を表示',
    },
    {
        label: 'PRINTFORMSL',
        kind: 'command',
        detail: '書式付文字列式を表示+改行',
    },
    {
        label: 'PRINTFORMSW',
        kind: 'command',
        detail: '書式付文字列式を表示+待機',
    },
    {
        label: 'PRINTFORMSK',
        kind: 'command',
        detail: '書式付文字列式を表示+カナ強制',
    },
    {
        label: 'PRINTFORMSKL',
        kind: 'command',
        detail: '書式付文字列式を表示+カナ強制+改行',
    },
    {
        label: 'PRINTFORMSKW',
        kind: 'command',
        detail: '書式付文字列式を表示+カナ強制+待機',
    },
    {
        label: 'PRINTFORMSD',
        kind: 'command',
        detail: '書式付文字列式を表示+初期色',
    },
    {
        label: 'PRINTFORMSDL',
        kind: 'command',
        detail: '書式付文字列式を表示+初期色+改行',
    },
    {
        label: 'PRINTFORMSDW',
        kind: 'command',
        detail: '書式付文字列式を表示+初期色+待機',
    },
    {
        label: 'PRINTSINGLE',
        kind: 'command',
        detail: '文字列を表示',
    },
    {
        label: 'PRINTSINGLEK',
        kind: 'command',
        detail: '文字列を表示+カナ強制',
    },
    {
        label: 'PRINTSINGLED',
        kind: 'command',
        detail: '文字列を表示+初期色',
    },
    {
        label: 'PRINTSINGLEV',
        kind: 'command',
        detail: '数式を表示',
    },
    {
        label: 'PRINTSINGLEVK',
        kind: 'command',
        detail: '数式を表示+カナ強制',
    },
    {
        label: 'PRINTSINGLEVD',
        kind: 'command',
        detail: '数式を表示+初期色',
    },
    {
        label: 'PRINTSINGLES',
        kind: 'command',
        detail: '文字列式を表示',
    },
    {
        label: 'PRINTSINGLESK',
        kind: 'command',
        detail: '文字列式を表示+カナ強制',
    },
    {
        label: 'PRINTSINGLESD',
        kind: 'command',
        detail: '文字列式を表示+初期色',
    },
    {
        label: 'PRINTSINGLEFORM',
        kind: 'command',
        detail: '書式付文字列を表示',
    },
    {
        label: 'PRINTSINGLEFORMK',
        kind: 'command',
        detail: '書式付文字列を表示+カナ強制',
    },
    {
        label: 'PRINTSINGLEFORMD',
        kind: 'command',
        detail: '書式付文字列を表示+初期色',
    },
    {
        label: 'PRINTSINGLEFORMS',
        kind: 'command',
        detail: '書式付文字列式を表示',
    },
    {
        label: 'PRINTSINGLEFORMSK',
        kind: 'command',
        detail: '書式付文字列式を表示+カナ強制',
    },
    {
        label: 'PRINTSINGLEFORMSD',
        kind: 'command',
        detail: '書式付文字列式を表示+初期色',
    },
    {
        label: 'PRINTC',
        kind: 'command',
        detail: '文字列を表示+右揃え',
    },
    {
        label: 'PRINTCK',
        kind: 'command',
        detail: '文字列を表示+右揃え+カナ強制',
    },
    {
        label: 'PRINTCD',
        kind: 'command',
        detail: '文字列を表示+右揃え+初期色',
    },
    {
        label: 'PRINTLC',
        kind: 'command',
        detail: '文字列を表示+左揃え',
    },
    {
        label: 'PRINTLCK',
        kind: 'command',
        detail: '文字列を表示+左揃え+カナ強制',
    },
    {
        label: 'PRINTLCD',
        kind: 'command',
        detail: '文字列を表示+左揃え+初期色',
    },
    {
        label: 'PRINTFORMC',
        kind: 'command',
        detail: '書式付文字列を表示+右揃え',
    },
    {
        label: 'PRINTFORMCK',
        kind: 'command',
        detail: '書式付文字列を表示+右揃え+カナ強制',
    },
    {
        label: 'PRINTFORMCD',
        kind: 'command',
        detail: '書式付文字列を表示+右揃え+初期色',
    },
    {
        label: 'PRINTFORMLC',
        kind: 'command',
        detail: '書式付文字列を表示+左揃え',
    },
    {
        label: 'PRINTFORMLCK',
        kind: 'command',
        detail: '書式付文字列を表示+左揃え+カナ強制',
    },
    {
        label: 'PRINTFORMLCD',
        kind: 'command',
        detail: '書式付文字列を表示+左揃え+初期色',
    },
    {
        label: 'DATA',
        kind: 'command',
    },
    {
        label: 'DATAFORM',
        kind: 'command',
    },
    {
        label: 'PRINTBUTTON',
        kind: 'command',
        detail: 'ボタンを表示',
    },
    {
        label: 'PRINTBUTTONC',
        kind: 'command',
        detail: 'ボタンを表示+右揃え',
    },
    {
        label: 'PRINTBUTTONLC',
        kind: 'command',
        detail: 'ボタンを表示+左揃え',
    },
    {
        label: 'PRINTPLAIN',
        kind: 'command',
        detail: '文字列を表示',
    },
    {
        label: 'PRINTPLAINFORM',
        kind: 'command',
        detail: '書式付文字列を表示',
    },
    {
        label: 'CUSTOMDRAWLINE',
        kind: 'command',
        detail: '横先を表示',
    },
    {
        label: 'DRAWLINEFORM',
        kind: 'command',
        detail: '横先を表示',
    },
    {
        label: 'REUSELASTLINE',
        kind: 'command',
        detail: '最終行を書き換え',
    },
    {
        label: 'PRINT_ABL',
        kind: 'command',
        detail: 'キャラの能力を表示',
    },
    {
        label: 'PRINT_TALENT',
        kind: 'command',
        detail: 'キャラの素質を表示',
    },
    {
        label: 'PRINT_MARK',
        kind: 'command',
        detail: 'キャラの刻印を表示',
    },
    {
        label: 'PRINT_EXP',
        kind: 'command',
        detail: 'キャラの経験を表示',
    },
    {
        label: 'PRINT_PALAM',
        kind: 'command',
        detail: 'キャラの調教中パラメータを表示',
    },
    {
        label: 'PRINT_ITEM',
        kind: 'command',
        detail: '所持アイテムを表示',
    },
    {
        label: 'PRINT_SHOPITEM',
        kind: 'command',
        detail: '販売アイテムを表示',
    },
    {
        label: 'UPCHECK',
        kind: 'command',
        detail: '調教中パラメータの変化を表示',
    },
    {
        label: 'DRAWLINE',
        kind: 'command',
        detail: '横先を表示',
    },
    {
        label: 'CLEARLINE',
        kind: 'command',
        detail: '行を削除',
    },
    {
        label: 'PRINT_IMG',
        kind: 'command',
        detail: '画像を表示',
    },
    {
        label: 'PRINT_RECT',
        kind: 'command',
        detail: '矩形を表示',
    },
    {
        label: 'PRINT_SPACE',
        kind: 'command',
        detail: '空白を表示',
    },
    {
        label: 'SETCOLOR',
        kind: 'command',
    },
    {
        label: 'RESETCOLOR',
        kind: 'command',
    },
    {
        label: 'SETBGCOLOR',
        kind: 'command',
    },
    {
        label: 'RESETBGCOLOR',
        kind: 'command',
    },
    {
        label: 'SETCOLORBYNAME',
        kind: 'command',
    },
    {
        label: 'SETBGCOLORBYNAME',
        kind: 'command',
    },
    {
        label: 'GETCOLOR',
        kind: 'command',
    },
    {
        label: 'GETDEFCOLOR',
        kind: 'command',
    },
    {
        label: 'GETBGCOLOR',
        kind: 'command',
    },
    {
        label: 'GETDEFBGCOLOR',
        kind: 'command',
    },
    {
        label: 'GETFOCUSCOLOR',
        kind: 'command',
    },
    {
        label: 'FONTBOLD',
        kind: 'command',
    },
    {
        label: 'FONTITALIC',
        kind: 'command',
    },
    {
        label: 'FONTREGULAR',
        kind: 'command',
    },
    {
        label: 'FONTSTYLE',
        kind: 'command',
    },
    {
        label: 'GETSTYLE',
        kind: 'command',
    },
    {
        label: 'CHKFONT',
        kind: 'command',
    },
    {
        label: 'SETFONT',
        kind: 'command',
    },
    {
        label: 'GETFONT',
        kind: 'command',
    },
    {
        label: 'FORCEKANA',
        kind: 'command',
    },
    {
        label: 'ALIGNMENT',
        kind: 'command',
    },
    {
        label: 'CURRENTALIGN',
        kind: 'command',
    },
    {
        label: 'REDRAW',
        kind: 'command',
    },
    {
        label: 'CURRENTREDRAW',
        kind: 'command',
    },
    {
        label: 'PRINTCPERLINE',
        kind: 'command',
    },
    {
        label: 'LINEISEMPTY',
        kind: 'command',
    },
    {
        label: 'BARSTR',
        kind: 'command',
    },
    {
        label: 'MONEYSTR',
        kind: 'command',
    },
    {
        label: 'SKIPDISP',
        kind: 'command',
    },
    {
        label: 'ISSKIP',
        kind: 'command',
    },
    {
        label: 'MOUSESKIP',
        kind: 'command',
    },
    {
        label: 'TOUPPER',
        kind: 'command',
    },
    {
        label: 'TOLOWER',
        kind: 'command',
    },
    {
        label: 'TOHALF',
        kind: 'command',
    },
    {
        label: 'TOFULL',
        kind: 'command',
    },
    {
        label: 'TOSTR',
        kind: 'command',
    },
    {
        label: 'ISNUMERIC',
        kind: 'command',
    },
    {
        label: 'TOINT',
        kind: 'command',
    },
    {
        label: 'STRLEN',
        kind: 'command',
    },
    {
        label: 'STRLENU',
        kind: 'command',
    },
    {
        label: 'STRLENS',
        kind: 'command',
    },
    {
        label: 'STRLENSU',
        kind: 'command',
    },
    {
        label: 'STRLENFORM',
        kind: 'command',
    },
    {
        label: 'STRLENFORMU',
        kind: 'command',
    },
    {
        label: 'SUBSTRING',
        kind: 'command',
    },
    {
        label: 'SUBSTRINGU',
        kind: 'command',
    },
    {
        label: 'CHARATU',
        kind: 'command',
    },
    {
        label: 'STRFIND',
        kind: 'command',
    },
    {
        label: 'STRFINDU',
        kind: 'command',
    },
    {
        label: 'STRCOUNT',
        kind: 'command',
    },
    {
        label: 'SPLIT',
        kind: 'command',
    },
    {
        label: 'REPLACE',
        kind: 'command',
    },
    {
        label: 'ESCAPE',
        kind: 'command',
    },
    {
        label: 'UNICODE',
        kind: 'command',
    },
    {
        label: 'ENCODETOUNI',
        kind: 'command',
    },
    {
        label: 'POWER',
        kind: 'command',
    },
    {
        label: 'ABS',
        kind: 'command',
    },
    {
        label: 'SIGN',
        kind: 'command',
    },
    {
        label: 'SQRT',
        kind: 'command',
    },
    {
        label: 'GETBIT',
        kind: 'command',
    },
    {
        label: 'MAX',
        kind: 'command',
    },
    {
        label: 'MIN',
        kind: 'command',
    },
    {
        label: 'LIMIT',
        kind: 'command',
    },
    {
        label: 'INRANGE',
        kind: 'command',
    },
    {
        label: 'SETBIT',
        kind: 'command',
    },
    {
        label: 'CLEARBIT',
        kind: 'command',
    },
    {
        label: 'INVERTBIT',
        kind: 'command',
    },
    {
        label: 'ADDCHARA',
        kind: 'command',
    },
    {
        label: 'DELCHARA',
        kind: 'command',
    },
    {
        label: 'SWAPCHARA',
        kind: 'command',
    },
    {
        label: 'SORTCHARA',
        kind: 'command',
    },
    {
        label: 'GETCHARA',
        kind: 'command',
    },
    {
        label: 'ADDDEFCHARA',
        kind: 'command',
    },
    {
        label: 'ADDVOIDCHARA',
        kind: 'command',
    },
    {
        label: 'DELALLCHARA',
        kind: 'command',
    },
    {
        label: 'PICKUPCHARA',
        kind: 'command',
    },
    {
        label: 'EXISTCSV',
        kind: 'command',
    },
    {
        label: 'FINDCHARA',
        kind: 'command',
    },
    {
        label: 'FINDLASTCHARA',
        kind: 'command',
    },
    {
        label: 'COPYCHARA',
        kind: 'command',
    },
    {
        label: 'ADDCOPYCHARA',
        kind: 'command',
    },
    {
        label: 'VARSIZE',
        kind: 'command',
    },
    {
        label: 'RESETDATA',
        kind: 'command',
    },
    {
        label: 'RESETGLOBAL',
        kind: 'command',
    },
    {
        label: 'RESET_STAIN',
        kind: 'command',
    },
    {
        label: 'SWAP',
        kind: 'command',
    },
    {
        label: 'CSVNAME',
        kind: 'command',
    },
    {
        label: 'CSVCALLNAME',
        kind: 'command',
    },
    {
        label: 'CSVNICKNAME',
        kind: 'command',
    },
    {
        label: 'CSVMASTERNAME',
        kind: 'command',
    },
    {
        label: 'CSVBASE',
        kind: 'command',
    },
    {
        label: 'CSVCSTR',
        kind: 'command',
    },
    {
        label: 'CSVABL',
        kind: 'command',
    },
    {
        label: 'CSVTALENT',
        kind: 'command',
    },
    {
        label: 'CSVMARK',
        kind: 'command',
    },
    {
        label: 'CSVEXP',
        kind: 'command',
    },
    {
        label: 'CSVRELATION',
        kind: 'command',
    },
    {
        label: 'CSVJUEL',
        kind: 'command',
    },
    {
        label: 'CSVEQUIP',
        kind: 'command',
    },
    {
        label: 'CSVCFLAG',
        kind: 'command',
    },
    {
        label: 'GETNUM',
        kind: 'command',
    },
    {
        label: 'GETPALAMLV',
        kind: 'command',
    },
    {
        label: 'GETEXPLV',
        kind: 'command',
    },
    {
        label: 'FINDELEMENT',
        kind: 'command',
    },
    {
        label: 'FINDLASTELEMENT',
        kind: 'command',
    },
    {
        label: 'VARSET',
        kind: 'command',
    },
    {
        label: 'CVARSET',
        kind: 'command',
    },
    {
        label: 'ARRAYSHIFT',
        kind: 'command',
    },
    {
        label: 'ARRAYREMOVE',
        kind: 'command',
    },
    {
        label: 'ARRAYSORT',
        kind: 'command',
    },
    {
        label: 'ARRAYCOPY',
        kind: 'command',
    },
    {
        label: 'CUPCHECK',
        kind: 'command',
    },
    {
        label: 'SAVEDATA',
        kind: 'command',
    },
    {
        label: 'LOADDATA',
        kind: 'command',
    },
    {
        label: 'DELDATA',
        kind: 'command',
    },
    {
        label: 'CHKDATA',
        kind: 'command',
    },
    {
        label: 'SAVENOS',
        kind: 'command',
    },
    {
        label: 'SAVEGLOBAL',
        kind: 'command',
    },
    {
        label: 'LOADGLOBAL',
        kind: 'command',
    },
    {
        label: 'OUTPUTLOG',
        kind: 'command',
    },
    {
        label: 'SAVECHARA',
        kind: 'command',
    },
    {
        label: 'LOADCHARA',
        kind: 'command',
    },
    {
        label: 'CHKCHARADATA',
        kind: 'command',
    },
    {
        label: 'FIND_CHARADATA',
        kind: 'command',
    },
    {
        label: 'GETTIME',
        kind: 'command',
    },
    {
        label: 'GETMILLISECOND',
        kind: 'command',
    },
    {
        label: 'GETSECOND',
        kind: 'command',
    },
    {
        label: 'FORCEWAIT',
        kind: 'command',
    },
    {
        label: 'INPUT',
        kind: 'command',
    },
    {
        label: 'INPUTS',
        kind: 'command',
    },
    {
        label: 'TINPUT',
        kind: 'command',
    },
    {
        label: 'TINPUTS',
        kind: 'command',
    },
    {
        label: 'TWAIT',
        kind: 'command',
    },
    {
        label: 'ONEINPUT',
        kind: 'command',
    },
    {
        label: 'ONEINPUTS',
        kind: 'command',
    },
    {
        label: 'TONEINPUT',
        kind: 'command',
    },
    {
        label: 'TONEINPUTS',
        kind: 'command',
    },
    {
        label: 'WAITANYKEY',
        kind: 'command',
    },
    {
        label: 'BREAK',
        kind: 'command',
    },
    {
        label: 'CONTINUE',
        kind: 'command',
    },
    {
        label: 'RANDOMIZE',
        kind: 'command',
    },
    {
        label: 'DUMPRAND',
        kind: 'command',
    },
    {
        label: 'INITRAND',
        kind: 'command',
    },
    {
        label: 'BEGIN',
        kind: 'command',
    },
    {
        label: 'CALLTRAIN',
        kind: 'command',
    },
    {
        label: 'DOTRAIN',
        kind: 'command',
    },
    {
        label: 'THROW',
        kind: 'command',
    },
    {
        label: 'CALL',
        kind: 'command',
    },
    {
        label: 'JUMP',
        kind: 'command',
    },
    {
        label: 'GOTO',
        kind: 'command',
    },
    {
        label: 'CALLFORM',
        kind: 'command',
    },
    {
        label: 'JUMPFORM',
        kind: 'command',
    },
    {
        label: 'GOTOFORM',
        kind: 'command',
    },
    {
        label: 'TRYCALL',
        kind: 'command',
    },
    {
        label: 'TRYJUMP',
        kind: 'command',
    },
    {
        label: 'TRYGOTO',
        kind: 'command',
    },
    {
        label: 'TRYCALLFORM',
        kind: 'command',
    },
    {
        label: 'TRYJUMPFORM',
        kind: 'command',
    },
    {
        label: 'TRYGOTOFORM',
        kind: 'command',
    },
    {
        label: 'CALLF',
        kind: 'command',
    },
    {
        label: 'CALLFORMF',
        kind: 'command',
    },
    {
        label: 'CALLEVENT',
        kind: 'command',
    },
    {
        label: 'FUNC',
        kind: 'command',
    },
    {
        label: 'RETURN',
        kind: 'command',
    },
    {
        label: 'RETURNFORM',
        kind: 'command',
    },
    {
        label: 'RETURNF',
        kind: 'command',
    },
    {
        label: 'DEBUGPRINT',
        kind: 'command',
    },
    {
        label: 'DEBUGPRINTL',
        kind: 'command',
    },
    {
        label: 'DEBUGPRINTFORM',
        kind: 'command',
    },
    {
        label: 'DEBUGPRINTFORML',
        kind: 'command',
    },
    {
        label: 'DEBUGCLEAR',
        kind: 'command',
    },
    {
        label: 'ASSERT',
        kind: 'command',
    },
    {
        label: 'TOOLTIP_SETCOLOR',
        kind: 'command',
    },
    {
        label: 'TOOLTIP_SETDELAY',
        kind: 'command',
    },
    {
        label: 'HTML_PRINT',
        kind: 'command',
    },
    {
        label: 'HTML_TAGSPLIT',
        kind: 'command',
    },
    {
        label: 'CLEARTEXTBOX',
        kind: 'command',
    },
    {
        label: 'STOPCALLTRAIN',
        kind: 'command',
    },
    {
        label: 'TIMES',
        kind: 'command',
    },
    {
        label: 'BAR',
        kind: 'command',
    },
    {
        label: 'BARL',
        kind: 'command',
    },
    {
        label: 'PUTFORM',
        kind: 'command',
    },
    {
        label: 'SAVEGAME',
        kind: 'command',
    },
    {
        label: 'LOADGAME',
        kind: 'command',
    },
    {
        label: 'WAIT',
        kind: 'command',
    },
    {
        label: 'RESTART',
        kind: 'command',
    },
    {
        label: 'QUIT',
        kind: 'command',
    },
    {
        label: 'GETTIMES',
        kind: 'function',
    },
    {
        label: 'RAND',
        kind: 'function',
    },
    {
        label: 'CBRT',
        kind: 'function',
    },
    {
        label: 'LOG',
        kind: 'function',
    },
    {
        label: 'LOG10',
        kind: 'function',
    },
    {
        label: 'EXPONENT',
        kind: 'function',
    },
    {
        label: 'SUMARRAY',
        kind: 'function',
    },
    {
        label: 'MATCH',
        kind: 'function',
    },
    {
        label: 'MAXARRAY',
        kind: 'function',
    },
    {
        label: 'MINARRAY',
        kind: 'function',
    },
    {
        label: 'SUMCARRAY',
        kind: 'function',
    },
    {
        label: 'CMATCH',
        kind: 'function',
    },
    {
        label: 'MAXCARRAY',
        kind: 'function',
    },
    {
        label: 'MINCARRAY',
        kind: 'function',
    },
    {
        label: 'GROUPMATCH',
        kind: 'function',
    },
    {
        label: 'NOSAMES',
        kind: 'function',
    },
    {
        label: 'ALLSAMES',
        kind: 'function',
    },
    {
        label: 'MESSKIP',
        kind: 'function',
    },
    {
        label: 'CONVERT',
        kind: 'function',
    },
    {
        label: 'COLOR_FROMNAME',
        kind: 'function',
    },
    {
        label: 'COLOR_FROMRGB',
        kind: 'function',
    },
    {
        label: 'INRANGEARRAY',
        kind: 'function',
    },
    {
        label: 'INRANGECARRAY',
        kind: 'function',
    },
    {
        label: 'GETLINESTR',
        kind: 'function',
    },
    {
        label: 'PRINTCLENGTH',
        kind: 'function',
    },
    {
        label: 'STRFORM',
        kind: 'function',
    },
    {
        label: 'GETCONFIG',
        kind: 'function',
    },
    {
        label: 'GETCONFIGS',
        kind: 'function',
    },
    {
        label: 'HTML_POPPRINTINGSTR',
        kind: 'function',
    },
    {
        label: 'HTML_GETPRINTEDSTR',
        kind: 'function',
    },
    {
        label: 'HTML_ESCAPE',
        kind: 'function',
    },
    {
        label: 'HTML_TOPLAINTEXT',
        kind: 'function',
    },
    {
        label: 'PRINTDATA',
        kind: 'control',
    },
    {
        label: 'PRINTDATAL',
        kind: 'control',
    },
    {
        label: 'PRINTDATAW',
        kind: 'control',
    },
    {
        label: 'PRINTDATAK',
        kind: 'control',
    },
    {
        label: 'PRINTDATAKL',
        kind: 'control',
    },
    {
        label: 'PRINTDATAKW',
        kind: 'control',
    },
    {
        label: 'PRINTDATAD',
        kind: 'control',
    },
    {
        label: 'PRINTDATADL',
        kind: 'control',
    },
    {
        label: 'PRINTDATADW',
        kind: 'control',
    },
    {
        label: 'STRDATA',
        kind: 'control',
    },
    {
        label: 'ENDDATA',
        kind: 'control',
    },
    {
        label: 'DATALIST',
        kind: 'control',
    },
    {
        label: 'ENDLIST',
        kind: 'control',
    },
    {
        label: 'NOSKIP',
        kind: 'control',
    },
    {
        label: 'ENDNOSKIP',
        kind: 'control',
    },
    {
        label: 'SIF',
        kind: 'control',
    },
    {
        label: 'IF',
        kind: 'control',
    },
    {
        label: 'ELSEIF',
        kind: 'control',
    },
    {
        label: 'ELSE',
        kind: 'control',
    },
    {
        label: 'ENDIF',
        kind: 'control',
    },
    {
        label: 'REPEAT',
        kind: 'control',
    },
    {
        label: 'REND',
        kind: 'control',
    },
    {
        label: 'FOR',
        kind: 'control',
    },
    {
        label: 'NEXT',
        kind: 'control',
    },
    {
        label: 'WHILE',
        kind: 'control',
    },
    {
        label: 'WEND',
        kind: 'control',
    },
    {
        label: 'DO',
        kind: 'control',
    },
    {
        label: 'LOOP',
        kind: 'control',
    },
    {
        label: 'SELECTCASE',
        kind: 'control',
    },
    {
        label: 'CASE',
        kind: 'control',
    },
    {
        label: 'IS',
        kind: 'control',
    },
    {
        label: 'TO',
        kind: 'control',
    },
    {
        label: 'CASEELSE',
        kind: 'control',
    },
    {
        label: 'ENDSELECT',
        kind: 'control',
    },
    {
        label: 'TRYCJUMP',
        kind: 'control',
    },
    {
        label: 'TRYCCALL',
        kind: 'control',
    },
    {
        label: 'TRYCGOTO',
        kind: 'control',
    },
    {
        label: 'TRYCJUMPFORM',
        kind: 'control',
    },
    {
        label: 'TRYCCALLFORM',
        kind: 'control',
    },
    {
        label: 'TRYCGOTOFORM',
        kind: 'control',
    },
    {
        label: 'CATCH',
        kind: 'control',
    },
    {
        label: 'ENDCATCH',
        kind: 'control',
    },
    {
        label: 'TRYCALLLIST',
        kind: 'control',
    },
    {
        label: 'TRYJUMPLIST',
        kind: 'control',
    },
    {
        label: 'TRYGOTOLIST',
        kind: 'control',
    },
    {
        label: 'ENDFUNC',
        kind: 'control',
    },
    {
        label: '#DIM',
        kind: 'keyword',
    },
    {
        label: '#DIMS',
        kind: 'keyword',
    },
    {
        label: '#SINGLE',
        kind: 'keyword',
    },
    {
        label: '#PRI',
        kind: 'keyword',
    },
    {
        label: '#LATER',
        kind: 'keyword',
    },
    {
        label: '#ONLY',
        kind: 'keyword',
    },
    {
        label: '#FUNCTION',
        kind: 'keyword',
    },
    {
        label: '#FUNCTIONS',
        kind: 'keyword',
    },
    {
        label: '#LOCALSIZE',
        kind: 'keyword',
    },
    {
        label: '#LOCALSSIZE',
        kind: 'keyword',
    },
    {
        label: '#DEFINE',
        kind: 'keyword',
    },
    {
        label: 'IF_DEBUG',
        kind: 'keyword',
    },
    {
        label: 'IF_NDEBUG',
        kind: 'keyword',
    },
    {
        label: 'SKIPSTART',
        kind: 'keyword',
    },
    {
        label: 'SKIPEND',
        kind: 'keyword',
    },
    {
        label: 'SAVEDATA',
        kind: 'keyword',
    },
    {
        label: 'CHARADATA',
        kind: 'keyword',
    },
    {
        label: 'GLOBAL',
        kind: 'keyword',
    },
    {
        label: 'DYNAMIC',
        kind: 'keyword',
    },
    {
        label: 'STATIC',
        kind: 'keyword',
    },
    {
        label: 'CONST',
        kind: 'keyword',
    },
    {
        label: 'REF',
        kind: 'keyword',
    },
    {
        label: 'SHOP',
        kind: 'keyword',
    },
    {
        label: 'TRAIN',
        kind: 'keyword',
    },
    {
        label: 'ABLUP',
        kind: 'keyword',
    },
    {
        label: 'AFTERTRAIN',
        kind: 'keyword',
    },
    {
        label: 'TURNEND',
        kind: 'keyword',
    },
    {
        label: 'FIRST',
        kind: 'keyword',
    },
    {
        label: 'TITLE',
        kind: 'keyword',
    },
    {
        label: 'LEFT',
        kind: 'keyword',
    },
    {
        label: 'CENTER',
        kind: 'keyword',
    },
    {
        label: 'RIGHT',
        kind: 'keyword',
    },
    {
        label: 'FORWARD',
        kind: 'keyword',
    },
    {
        label: 'BACK',
        kind: 'keyword',
    },
    {
        label: 'DAY',
        kind: 'variable',
    },
    {
        label: 'MONEY',
        kind: 'variable',
    },
    {
        label: 'ITEM',
        kind: 'variable',
    },
    {
        label: 'FLAG',
        kind: 'variable',
    },
    {
        label: 'TFLAG',
        kind: 'variable',
    },
    {
        label: 'UP',
        kind: 'variable',
    },
    {
        label: 'PALAMLV',
        kind: 'variable',
    },
    {
        label: 'EXPLV',
        kind: 'variable',
    },
    {
        label: 'EJAC',
        kind: 'variable',
    },
    {
        label: 'DOWN',
        kind: 'variable',
    },
    {
        label: 'RESULT',
        kind: 'variable',
    },
    {
        label: 'COUNT',
        kind: 'variable',
    },
    {
        label: 'TARGET',
        kind: 'variable',
    },
    {
        label: 'ASSI',
        kind: 'variable',
    },
    {
        label: 'MASTER',
        kind: 'variable',
    },
    {
        label: 'NOITEM',
        kind: 'variable',
    },
    {
        label: 'LOSEBASE',
        kind: 'variable',
    },
    {
        label: 'SELECTCOM',
        kind: 'variable',
    },
    {
        label: 'ASSIPLAY',
        kind: 'variable',
    },
    {
        label: 'PREVCOM',
        kind: 'variable',
    },
    {
        label: 'TIME',
        kind: 'variable',
    },
    {
        label: 'ITEMSALES',
        kind: 'variable',
    },
    {
        label: 'PLAYER',
        kind: 'variable',
    },
    {
        label: 'NEXTCOM',
        kind: 'variable',
    },
    {
        label: 'PBAND',
        kind: 'variable',
    },
    {
        label: 'BOUGHT',
        kind: 'variable',
    },
    {
        label: 'A',
        kind: 'variable',
    },
    {
        label: 'B',
        kind: 'variable',
    },
    {
        label: 'C',
        kind: 'variable',
    },
    {
        label: 'D',
        kind: 'variable',
    },
    {
        label: 'E',
        kind: 'variable',
    },
    {
        label: 'F',
        kind: 'variable',
    },
    {
        label: 'G',
        kind: 'variable',
    },
    {
        label: 'H',
        kind: 'variable',
    },
    {
        label: 'I',
        kind: 'variable',
    },
    {
        label: 'J',
        kind: 'variable',
    },
    {
        label: 'K',
        kind: 'variable',
    },
    {
        label: 'L',
        kind: 'variable',
    },
    {
        label: 'M',
        kind: 'variable',
    },
    {
        label: 'N',
        kind: 'variable',
    },
    {
        label: 'O',
        kind: 'variable',
    },
    {
        label: 'P',
        kind: 'variable',
    },
    {
        label: 'Q',
        kind: 'variable',
    },
    {
        label: 'R',
        kind: 'variable',
    },
    {
        label: 'S',
        kind: 'variable',
    },
    {
        label: 'T',
        kind: 'variable',
    },
    {
        label: 'U',
        kind: 'variable',
    },
    {
        label: 'V',
        kind: 'variable',
    },
    {
        label: 'W',
        kind: 'variable',
    },
    {
        label: 'X',
        kind: 'variable',
    },
    {
        label: 'Y',
        kind: 'variable',
    },
    {
        label: 'Z',
        kind: 'variable',
    },
    {
        label: 'GLOBAL',
        kind: 'variable',
    },
    {
        label: 'RANDDATA',
        kind: 'variable',
    },
    {
        label: 'SAVESTR',
        kind: 'variable',
    },
    {
        label: 'TSTR',
        kind: 'variable',
    },
    {
        label: 'STR',
        kind: 'variable',
    },
    {
        label: 'RESULTS',
        kind: 'variable',
    },
    {
        label: 'GLOBALS',
        kind: 'variable',
    },
    {
        label: 'SAVEDATA_TEXT',
        kind: 'variable',
    },
    {
        label: 'ISASSI',
        kind: 'variable',
    },
    {
        label: 'NO',
        kind: 'variable',
    },
    {
        label: 'BASE',
        kind: 'variable',
    },
    {
        label: 'MAXBASE',
        kind: 'variable',
    },
    {
        label: 'ABL',
        kind: 'variable',
    },
    {
        label: 'TALENT',
        kind: 'variable',
    },
    {
        label: 'EXP',
        kind: 'variable',
    },
    {
        label: 'MARK',
        kind: 'variable',
    },
    {
        label: 'PALAM',
        kind: 'variable',
    },
    {
        label: 'SOURCE',
        kind: 'variable',
    },
    {
        label: 'EX',
        kind: 'variable',
    },
    {
        label: 'CFLAG',
        kind: 'variable',
    },
    {
        label: 'JUEL',
        kind: 'variable',
    },
    {
        label: 'RELATION',
        kind: 'variable',
    },
    {
        label: 'EQUIP',
        kind: 'variable',
    },
    {
        label: 'TEQUIP',
        kind: 'variable',
    },
    {
        label: 'STAIN',
        kind: 'variable',
    },
    {
        label: 'GOTJUEL',
        kind: 'variable',
    },
    {
        label: 'NOWEX',
        kind: 'variable',
    },
    {
        label: 'DOWNBASE',
        kind: 'variable',
    },
    {
        label: 'CUP',
        kind: 'variable',
    },
    {
        label: 'CDOWN',
        kind: 'variable',
    },
    {
        label: 'TCVAR',
        kind: 'variable',
    },
    {
        label: 'NAME',
        kind: 'variable',
    },
    {
        label: 'CALLNAME',
        kind: 'variable',
    },
    {
        label: 'NICKNAME',
        kind: 'variable',
    },
    {
        label: 'MASTERNAME',
        kind: 'variable',
    },
    {
        label: 'CSTR',
        kind: 'variable',
    },
    {
        label: 'CDFLAG',
        kind: 'variable',
    },
    {
        label: 'DITEMTYPE',
        kind: 'variable',
    },
    {
        label: 'DA',
        kind: 'variable',
    },
    {
        label: 'DB',
        kind: 'variable',
    },
    {
        label: 'DC',
        kind: 'variable',
    },
    {
        label: 'DD',
        kind: 'variable',
    },
    {
        label: 'DE',
        kind: 'variable',
    },
    {
        label: 'TA',
        kind: 'variable',
    },
    {
        label: 'TB',
        kind: 'variable',
    },
    {
        label: 'ITEMPRICE',
        kind: 'variable',
    },
    {
        label: 'ABLNAME',
        kind: 'variable',
    },
    {
        label: 'TALENTNAME',
        kind: 'variable',
    },
    {
        label: 'EXPNAME',
        kind: 'variable',
    },
    {
        label: 'MARKNAME',
        kind: 'variable',
    },
    {
        label: 'PALAMNAME',
        kind: 'variable',
    },
    {
        label: 'ITEMNAME',
        kind: 'variable',
    },
    {
        label: 'TRAINNAME',
        kind: 'variable',
    },
    {
        label: 'BASENAME',
        kind: 'variable',
    },
    {
        label: 'SOURCENAME',
        kind: 'variable',
    },
    {
        label: 'EXNAME',
        kind: 'variable',
    },
    {
        label: 'EQUIPNAME',
        kind: 'variable',
    },
    {
        label: 'TEQUIPNAME',
        kind: 'variable',
    },
    {
        label: 'FLAGNAME',
        kind: 'variable',
    },
    {
        label: 'TFLAGNAME',
        kind: 'variable',
    },
    {
        label: 'CFLAGNAME',
        kind: 'variable',
    },
    {
        label: 'TCVARNAME',
        kind: 'variable',
    },
    {
        label: 'CSTRNAME',
        kind: 'variable',
    },
    {
        label: 'STAINNAME',
        kind: 'variable',
    },
    {
        label: 'CDFLAGNAME1',
        kind: 'variable',
    },
    {
        label: 'CDFLAGNAME2',
        kind: 'variable',
    },
    {
        label: 'STRNAME',
        kind: 'variable',
    },
    {
        label: 'TSTRNAME',
        kind: 'variable',
    },
    {
        label: 'SAVESTRNAME',
        kind: 'variable',
    },
    {
        label: 'GLOBALNAME',
        kind: 'variable',
    },
    {
        label: 'GLOBALSNAME',
        kind: 'variable',
    },
    {
        label: 'GAMEBASE_AUTHER',
        kind: 'variable',
    },
    {
        label: 'GAMEBASE_AUTHOR',
        kind: 'variable',
    },
    {
        label: 'GAMEBASE_INFO',
        kind: 'variable',
    },
    {
        label: 'GAMEBASE_YEAR',
        kind: 'variable',
    },
    {
        label: 'GAMEBASE_TITLE',
        kind: 'variable',
    },
    {
        label: 'GAMEBASE_GAMECODE',
        kind: 'variable',
    },
    {
        label: 'GAMEBASE_VERSION',
        kind: 'variable',
    },
    {
        label: 'GAMEBASE_ALLOWVERSION',
        kind: 'variable',
    },
    {
        label: 'GAMEBASE_DEFAULTCHARA',
        kind: 'variable',
    },
    {
        label: 'GAMEBASE_NOITEM',
        kind: 'variable',
    },
    {
        label: 'RAND',
        kind: 'variable',
    },
    {
        label: 'CHARANUM',
        kind: 'variable',
    },
    {
        label: 'LASTLOAD_TEXT',
        kind: 'variable',
    },
    {
        label: 'LASTLOAD_VERSION',
        kind: 'variable',
    },
    {
        label: 'LASTLOAD_NO',
        kind: 'variable',
    },
    {
        label: 'LINECOUNT',
        kind: 'variable',
    },
    {
        label: 'ISTIMEOUT',
        kind: 'variable',
    },
    {
        label: '__INT_MAX__',
        kind: 'variable',
    },
    {
        label: '__INT_MIN__',
        kind: 'variable',
    },
    {
        label: 'EMUERA_VERSION',
        kind: 'variable',
    },
    {
        label: 'WINDOW_TITLE',
        kind: 'variable',
    },
    {
        label: 'MONEYLABEL',
        kind: 'variable',
    },
    {
        label: 'DRAWLINESTR',
        kind: 'variable',
    },
    {
        label: '__FILE__',
        kind: 'variable',
    },
    {
        label: '__FUNCTION__',
        kind: 'variable',
    },
    {
        label: '__LINE__',
        kind: 'variable',
    },
    {
        label: 'LOCAL',
        kind: 'variable',
    },
    {
        label: 'ARG',
        kind: 'variable',
    },
    {
        label: 'LOCALS',
        kind: 'variable',
    },
    {
        label: 'ARGS',
        kind: 'variable',
    },
]);
