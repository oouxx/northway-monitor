export const encodeStrategyEngineTypeEnum = {
  SET_Treading: 0,
  SET_Backtesting: 1,
};

export const decodeStrategyEngineTypeEnum = {
  0: "SET_Treading",
  1: "SET_Backtesting",
};

export const encodeGatewayTypeEnum = {
  GTE_TradeAndMarketData: 0,
  GTE_MarketData: 1,
  GTE_Trade: 2,
};

export const decodeGatewayTypeEnum = {
  0: "GTE_TradeAndMarketData",
  1: "GTE_MarketData",
  2: "GTE_Trade",
};

export const encodeGatewayAdapterTypeEnum = {
  GAT_CTP: 0,
  GAT_IB: 1,
};

export const decodeGatewayAdapterTypeEnum = {
  0: "GAT_CTP",
  1: "GAT_IB",
};

export const encodeCommonStatusEnum = {
  COMS_SUCCESS: 0,
  COMS_INFO: 1,
  COMS_WARN: 2,
  COMS_ERROR: 3,
};

export const decodeCommonStatusEnum = {
  0: "COMS_SUCCESS",
  1: "COMS_INFO",
  2: "COMS_WARN",
  3: "COMS_ERROR",
};

export const encodeLogLevelEnum = {
  LL_All: 0,
  LL_Error: 40000,
  LL_Warn: 30000,
  LL_Info: 20000,
  LL_Debug: 10000,
  LL_Trace: 5000,
};

export const decodeLogLevelEnum = {
  0: "LL_All",
  40000: "LL_Error",
  30000: "LL_Warn",
  20000: "LL_Info",
  10000: "LL_Debug",
  5000: "LL_Trace",
};

export const encodeMarketDataDBTypeEnum = {
  MDDT_MIX: 0,
  MDDT_TD: 1,
  MDDT_HIST: 2,
};

export const decodeMarketDataDBTypeEnum = {
  0: "MDDT_MIX",
  1: "MDDT_TD",
  2: "MDDT_HIST",
};

export const encodeBarCycleEnum = {
  B_5Sec: 0,
  B_1Min: 1,
  B_3Min: 2,
  B_5Min: 3,
  B_15Min: 4,
  B_1Day: 5,
};

export const decodeBarCycleEnum = {
  0: "B_5Sec",
  1: "B_1Min",
  2: "B_3Min",
  3: "B_5Min",
  4: "B_15Min",
  5: "B_1Day",
};

export const encodeConnectStatusEnum = {
  CS_Unknown: 0,
  CS_Disconnected: 1,
  CS_Connected: 2,
  CS_Disconnecting: 3,
  CS_Connecting: 4,
};

export const decodeConnectStatusEnum = {
  0: "CS_Unknown",
  1: "CS_Disconnected",
  2: "CS_Connected",
  3: "CS_Disconnecting",
  4: "CS_Connecting",
};

export const encodeOrderActionStatusTyp = {
  OAS_Unknown: 0,
  OAS_Submitted: 1,
  OAS_Accepted: 2,
  OAS_Rejected: 3,
};

export const decodeOrderActionStatusTyp = {
  0: "OAS_Unknown",
  1: "OAS_Submitted",
  2: "OAS_Accepted",
  3: "OAS_Rejected",
};

export const encodeOrderStatusEnum = {
  OS_Unknown: 0,
  OS_AllTraded: 1,
  OS_PartTradedQueueing: 2,
  OS_PartTradedNotQueueing: 3,
  OS_NoTradeQueueing: 4,
  OS_NoTradeNotQueueing: 5,
  OS_Canceled: 6,
  OS_NotTouched: 7,
  OS_Touched: 8,
  OS_Rejected: 9,
};

export const decodeOrderStatusEnum = {
  0: "OS_Unknown",
  1: "OS_AllTraded",
  2: "OS_PartTradedQueueing",
  3: "OS_PartTradedNotQueueing",
  4: "OS_NoTradeQueueing",
  5: "OS_NoTradeNotQueueing",
  6: "OS_Canceled",
  7: "OS_NotTouched",
  8: "OS_Touched",
  9: "OS_Rejected",
};

export const encodeOrderSubmitStatusEnum = {
  OSS_Unknown: 0,
  OSS_InsertSubmitted: 1,
  OSS_CancelSubmitted: 2,
  OSS_ModifySubmitted: 3,
  OSS_Accepted: 4,
  OSS_InsertRejected: 5,
  OSS_CancelRejected: 6,
  OSS_ModifyRejected: 7,
};

export const decodeOrderSubmitStatusEnum = {
  0: "OSS_Unknown",
  1: "OSS_InsertSubmitted",
  2: "OSS_CancelSubmitted",
  3: "OSS_ModifySubmitted",
  4: "OSS_Accepted",
  5: "OSS_InsertRejected",
  6: "OSS_CancelRejected",
  7: "OSS_ModifyRejected",
};

export const encodeProductClassEnum = {
  UnknownProductClass: 0,
  EQUITY: 1,
  FUTURES: 2,
  OPTION: 3,
  INDEX: 4,
  COMBINATION: 5,
  BOND: 6,
  FOREX: 7,
  SPOT: 8,
  DEFER: 9,
  ETF: 10,
  WARRANTS: 11,
  SPREAD: 12,
  FUND: 13,
  EFP: 14,
  SPOTOPTION: 15,
  MARGIN: 16,
  SWAP: 17,
};

export const decodeProductClassEnum = {
  0: "UnknownProductClass",
  1: "EQUITY",
  2: "FUTURES",
  3: "OPTION",
  4: "INDEX",
  5: "COMBINATION",
  6: "BOND",
  7: "FOREX",
  8: "SPOT",
  9: "DEFER",
  10: "ETF",
  11: "WARRANTS",
  12: "SPREAD",
  13: "FUND",
  14: "EFP",
  15: "SPOTOPTION",
  16: "MARGIN",
  17: "SWAP",
};

export const encodeDirectionEnum = {
  D_Unknown: 0,
  D_Buy: 1,
  D_Sell: 2,
};

export const decodeDirectionEnum = {
  0: "D_Unknown",
  1: "D_Buy",
  2: "D_Sell",
};

export const encodePositionTypeEnum = {
  PT_Unknown: 0,
  PT_Net: 1,
  PT_Gross: 2,
};

export const decodePositionTypeEnum = {
  0: "PT_Unknown",
  1: "PT_Net",
  2: "PT_Gross",
};

export const encodePositionDirectionEnum = {
  PD_Unknown: 0,
  PD_Net: 1,
  PD_Long: 2,
  PD_Short: 3,
};

export const decodePositionDirectionEnum = {
  0: "PD_Unknown",
  1: "PD_Net",
  2: "PD_Long",
  3: "PD_Short",
};

export const encodeHedgeFlagEnum = {
  HF_Unknown: 0,
  HF_Speculation: 1,
  HF_Arbitrage: 2,
  HF_Hedge: 3,
  HF_MarketMaker: 4,
  HF_SpecHedge: 5,
  HF_HedgeSpec: 6,
};

export const decodeHedgeFlagEnum = {
  0: "HF_Unknown",
  1: "HF_Speculation",
  2: "HF_Arbitrage",
  3: "HF_Hedge",
  4: "HF_MarketMaker",
  5: "HF_SpecHedge",
  6: "HF_HedgeSpec",
};

export const encodeOrderPriceTypeEnum = {
  OPT_Unknown: 0,
  OPT_AnyPrice: 1,
  OPT_LimitPrice: 2,
  OPT_BestPrice: 3,
  OPT_LastPrice: 4,
  OPT_LastPricePlusOneTicks: 5,
  OPT_LastPricePlusTwoTicks: 6,
  OPT_LastPricePlusThreeTicks: 7,
  OPT_AskPrice1: 8,
  OPT_AskPrice1PlusOneTicks: 9,
  OPT_AskPrice1PlusTwoTicks: 10,
  OPT_AskPrice1PlusThreeTicks: 11,
  OPT_BidPrice1: 12,
  OPT_BidPrice1PlusOneTicks: 13,
  OPT_BidPrice1PlusTwoTicks: 14,
  OPT_BidPrice1PlusThreeTicks: 15,
  OPT_FiveLevelPrice: 16,
};

export const decodeOrderPriceTypeEnum = {
  0: "OPT_Unknown",
  1: "OPT_AnyPrice",
  2: "OPT_LimitPrice",
  3: "OPT_BestPrice",
  4: "OPT_LastPrice",
  5: "OPT_LastPricePlusOneTicks",
  6: "OPT_LastPricePlusTwoTicks",
  7: "OPT_LastPricePlusThreeTicks",
  8: "OPT_AskPrice1",
  9: "OPT_AskPrice1PlusOneTicks",
  10: "OPT_AskPrice1PlusTwoTicks",
  11: "OPT_AskPrice1PlusThreeTicks",
  12: "OPT_BidPrice1",
  13: "OPT_BidPrice1PlusOneTicks",
  14: "OPT_BidPrice1PlusTwoTicks",
  15: "OPT_BidPrice1PlusThreeTicks",
  16: "OPT_FiveLevelPrice",
};

export const encodeOffsetFlagEnum = {
  OF_Unknown: 0,
  OF_Open: 1,
  OF_Close: 2,
  OF_ForceClose: 3,
  OF_CloseToday: 4,
  OF_CloseYesterday: 5,
  OF_ForceOff: 6,
  OF_LocalForceClose: 7,
};

export const decodeOffsetFlagEnum = {
  0: "OF_Unknown",
  1: "OF_Open",
  2: "OF_Close",
  3: "OF_ForceClose",
  4: "OF_CloseToday",
  5: "OF_CloseYesterday",
  6: "OF_ForceOff",
  7: "OF_LocalForceClose",
};

export const encodeForceCloseReasonEnum = {
  FCR_Unknown: 0,
  FCR_NotForceClose: 1,
  FCR_LackDeposit: 2,
  FCR_ClientOverPositionLimit: 3,
  FCR_MemberOverPositionLimit: 4,
  FCR_NotMultiple: 5,
  FCR_Violation: 6,
  FCR_Other: 7,
  FCR_PersonDeliver: 8,
};

export const decodeForceCloseReasonEnum = {
  0: "FCR_Unknown",
  1: "FCR_NotForceClose",
  2: "FCR_LackDeposit",
  3: "FCR_ClientOverPositionLimit",
  4: "FCR_MemberOverPositionLimit",
  5: "FCR_NotMultiple",
  6: "FCR_Violation",
  7: "FCR_Other",
  8: "FCR_PersonDeliver",
};

export const encodeOrderTypeEnum = {
  OT_Unknown: 0,
  OT_Normal: 1,
  OT_DeriveFromQuote: 2,
  OT_DeriveFromCombination: 3,
  OT_Combination: 4,
  OT_ConditionalOrder: 5,
  OT_Swap: 6,
};

export const decodeOrderTypeEnum = {
  0: "OT_Unknown",
  1: "OT_Normal",
  2: "OT_DeriveFromQuote",
  3: "OT_DeriveFromCombination",
  4: "OT_Combination",
  5: "OT_ConditionalOrder",
  6: "OT_Swap",
};

export const encodeTimeConditionEnum = {
  TC_Unknown: 0,
  TC_IOC: 1,
  TC_GFS: 2,
  TC_GFD: 3,
  TC_GTD: 4,
  TC_GTC: 5,
  TC_GFA: 6,
};

export const decodeTimeConditionEnum = {
  0: "TC_Unknown",
  1: "TC_IOC",
  2: "TC_GFS",
  3: "TC_GFD",
  4: "TC_GTD",
  5: "TC_GTC",
  6: "TC_GFA",
};

export const encodeVolumeConditionEnum = {
  VC_Unknown: 0,
  VC_AV: 1,
  VC_MV: 2,
  VC_CV: 3,
};

export const decodeVolumeConditionEnum = {
  0: "VC_Unknown",
  1: "VC_AV",
  2: "VC_MV",
  3: "VC_CV",
};

export const encodeContingentConditionEnum = {
  CC_Unknown: 0,
  CC_Immediately: 1,
  CC_Touch: 2,
  CC_TouchProfit: 3,
  CC_ParkedOrder: 4,
  CC_LastPriceGreaterThanStopPrice: 5,
  CC_LastPriceGreaterEqualStopPrice: 6,
  CC_LastPriceLesserThanStopPrice: 7,
  CC_LastPriceLesserEqualStopPrice: 8,
  CC_AskPriceGreaterThanStopPrice: 9,
  CC_AskPriceGreaterEqualStopPrice: 10,
  CC_AskPriceLesserThanStopPrice: 11,
  CC_AskPriceLesserEqualStopPrice: 12,
  CC_BidPriceGreaterThanStopPrice: 13,
  CC_BidPriceGreaterEqualStopPrice: 14,
  CC_BidPriceLesserThanStopPrice: 15,
  CC_BidPriceLesserEqualStopPrice: 16,
  CC_LocalLastPriceLesserEqualStopPrice: 17,
  CC_LocalLastPriceGreaterEqualStopPrice: 18,
};

export const decodeContingentConditionEnum = {
  0: "CC_Unknown",
  1: "CC_Immediately",
  2: "CC_Touch",
  3: "CC_TouchProfit",
  4: "CC_ParkedOrder",
  5: "CC_LastPriceGreaterThanStopPrice",
  6: "CC_LastPriceGreaterEqualStopPrice",
  7: "CC_LastPriceLesserThanStopPrice",
  8: "CC_LastPriceLesserEqualStopPrice",
  9: "CC_AskPriceGreaterThanStopPrice",
  10: "CC_AskPriceGreaterEqualStopPrice",
  11: "CC_AskPriceLesserThanStopPrice",
  12: "CC_AskPriceLesserEqualStopPrice",
  13: "CC_BidPriceGreaterThanStopPrice",
  14: "CC_BidPriceGreaterEqualStopPrice",
  15: "CC_BidPriceLesserThanStopPrice",
  16: "CC_BidPriceLesserEqualStopPrice",
  17: "CC_LocalLastPriceLesserEqualStopPrice",
  18: "CC_LocalLastPriceGreaterEqualStopPrice",
};

export const encodeActionFlagEnum = {
  AF_Unknown: 0,
  AF_Delete: 1,
  AF_Modify: 2,
};

export const decodeActionFlagEnum = {
  0: "AF_Unknown",
  1: "AF_Delete",
  2: "AF_Modify",
};

export const encodeTradingRightEnum = {
  TR_Unknown: 0,
  TR_Allow: 1,
  TR_CloseOnly: 2,
  TR_Forbidden: 3,
};

export const decodeTradingRightEnum = {
  0: "TR_Unknown",
  1: "TR_Allow",
  2: "TR_CloseOnly",
  3: "TR_Forbidden",
};

export const encodeOrderSourceEnum = {
  ODS_Unknown: 0,
  ODS_Participant: 1,
  ODS_Administrator: 2,
};

export const decodeOrderSourceEnum = {
  0: "ODS_Unknown",
  1: "ODS_Participant",
  2: "ODS_Administrator",
};

export const encodeTradeTypeEnum = {
  TT_Unknown: 0,
  TT_SplitCombination: 1,
  TT_Common: 2,
  TT_OptionsExecution: 3,
  TT_OTC: 4,
  TT_EFPDerived: 5,
  TT_CombinationDerived: 6,
  TT_BlockTrade: 7,
};

export const decodeTradeTypeEnum = {
  0: "TT_Unknown",
  1: "TT_SplitCombination",
  2: "TT_Common",
  3: "TT_OptionsExecution",
  4: "TT_OTC",
  5: "TT_EFPDerived",
  6: "TT_CombinationDerived",
  7: "TT_BlockTrade",
};

export const encodePriceSourceEnum = {
  PSRC_Unknown: 0,
  PSRC_LastPrice: 1,
  PSRC_Buy: 2,
  PSRC_Sell: 3,
  PSRC_OTC: 4,
};

export const decodePriceSourceEnum = {
  0: "PSRC_Unknown",
  1: "PSRC_LastPrice",
  2: "PSRC_Buy",
  3: "PSRC_Sell",
  4: "PSRC_OTC",
};

export const encodeCurrencyEnum = {
  UnknownCurrency: 0,
  USD: 1,
  CNY: 2,
  CNH: 3,
  HKD: 4,
  JPY: 5,
  EUR: 6,
  GBP: 7,
  DEM: 8,
  CHF: 9,
  FRF: 10,
  CAD: 11,
  AUD: 12,
  ATS: 13,
  FIM: 14,
  BEF: 15,
  THB: 16,
  IEP: 17,
  ITL: 18,
  LUF: 19,
  NLG: 20,
  PTE: 21,
  ESP: 22,
  IDR: 23,
  MYR: 24,
  NZD: 25,
  PHP: 26,
  SUR: 27,
  SGD: 28,
  KRW: 29,
  USDT: 30,
  BUSD: 31,
  USDC: 32,
};

export const decodeCurrencyEnum = {
  0: "UnknownCurrency",
  1: "USD",
  2: "CNY",
  3: "CNH",
  4: "HKD",
  5: "JPY",
  6: "EUR",
  7: "GBP",
  8: "DEM",
  9: "CHF",
  10: "FRF",
  11: "CAD",
  12: "AUD",
  13: "ATS",
  14: "FIM",
  15: "BEF",
  16: "THB",
  17: "IEP",
  18: "ITL",
  19: "LUF",
  20: "NLG",
  21: "PTE",
  22: "ESP",
  23: "IDR",
  24: "MYR",
  25: "NZD",
  26: "PHP",
  27: "SUR",
  28: "SGD",
  29: "KRW",
  30: "USDT",
  31: "BUSD",
  32: "USDC",
};

export const encodeExchangeEnum = {
  UnknownExchange: 0,
  SSE: 1,
  SZSE: 2,
  CFFEX: 3,
  SHFE: 4,
  CZCE: 5,
  DCE: 6,
  SGE: 7,
  INE: 8,
  SEHK: 9,
  HKFE: 10,
  SGX: 11,
  NYBOT: 12,
  NYMEX: 13,
  COMEX: 14,
  CME: 15,
  CFE: 16,
  GLOBEX: 17,
  ICE: 18,
  IPE: 19,
  LME: 20,
  IDEALPRO: 21,
  OANDA: 22,
  FXCM: 23,
  SMART: 24,
  GFEX: 25,
  BINANCE: 26,
  OKX: 27,
  GATE: 28,
  BSE: 29,
};

export const decodeExchangeEnum = {
  0: "UnknownExchange",
  1: "SSE",
  2: "SZSE",
  3: "CFFEX",
  4: "SHFE",
  5: "CZCE",
  6: "DCE",
  7: "SGE",
  8: "INE",
  9: "SEHK",
  10: "HKFE",
  11: "SGX",
  12: "NYBOT",
  13: "NYMEX",
  14: "COMEX",
  15: "CME",
  16: "CFE",
  17: "GLOBEX",
  18: "ICE",
  19: "IPE",
  20: "LME",
  21: "IDEALPRO",
  22: "OANDA",
  23: "FXCM",
  24: "SMART",
  25: "GFEX",
  26: "BINANCE",
  27: "OKX",
  28: "GATE",
  29: "BSE",
};

export const encodeOptionsTypeEnum = {
  O_Unknown: 0,
  O_CallOptions: 1,
  O_PutOptions: 2,
};

export const decodeOptionsTypeEnum = {
  0: "O_Unknown",
  1: "O_CallOptions",
  2: "O_PutOptions",
};

export const encodeStrikeModeEnum = {
  STM_Unknown: 0,
  STM_Continental: 1,
  STM_American: 2,
  STM_Bermuda: 3,
};

export const decodeStrikeModeEnum = {
  0: "STM_Unknown",
  1: "STM_Continental",
  2: "STM_American",
  3: "STM_Bermuda",
};

export const encodeCombinationTypeEnum = {
  COMBT_Unknown: 0,
  COMBT_Future: 1,
  COMBT_BUL: 2,
  COMBT_BER: 3,
  COMBT_STD: 4,
  COMBT_STG: 5,
  COMBT_PRT: 6,
  COMBT_CLD: 7,
};

export const decodeCombinationTypeEnum = {
  0: "COMBT_Unknown",
  1: "COMBT_Future",
  2: "COMBT_BUL",
  3: "COMBT_BER",
  4: "COMBT_STD",
  5: "COMBT_STG",
  6: "COMBT_PRT",
  7: "COMBT_CLD",
};

function pushTemporaryLength(bb) {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb, type) {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value) {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value) {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value) {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack = [];

function popByteBuffer() {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb) {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes) {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb) {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb, offset) {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb) {
  return bb.offset >= bb.limit;
}

function grow(bb, count) {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb, count) {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb, count) {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb, buffer) {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb, count) {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2, c3, c4, c;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb, text) {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb, buffer) {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb) {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb, value) {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb) {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb, value) {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb, unsigned) {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb, value) {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb) {
  let c = 0;
  let value = 0;
  let b;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb, value) {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb, unsigned) {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb, value) {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb) {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb, value) {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb) {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb, value) {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
