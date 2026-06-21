export type NewsCategory = "global" | "vietnam";

export interface NewsSource {
  name: string;
  url: string;
  cat: NewsCategory;
}

export const VN_NEWS_SOURCES: NewsSource[] = [
  { name: "CafeF", url: "https://cafef.vn/rss.ashx", cat: "vietnam" },
  { name: "Vietstock", url: "https://feed.vietstock.vn/all.rss", cat: "vietnam" },
  { name: "VnEconomy", url: "https://vneconomy.vn/rss/all.rss", cat: "vietnam" },
  { name: "NDH", url: "https://ndh.vn/rss", cat: "vietnam" },
  { name: "Tin Nhanh Chứng Khoán", url: "https://tinnhanhchungkhoan.vn/rss", cat: "vietnam" },
  { name: "Báo Đầu Tư", url: "https://baodautu.vn/rss", cat: "vietnam" },
  { name: "Thời Báo Ngân Hàng", url: "https://thoibaonganhang.vn/rss", cat: "vietnam" },
  { name: "Tạp chí Tài chính", url: "https://tapchitaichinh.vn/rss", cat: "vietnam" },
  { name: "Kinh Tế Đô Thị", url: "https://kinhtedothi.vn/rss", cat: "vietnam" },
  { name: "Tuổi Trẻ", url: "https://tuoitre.vn/rss", cat: "vietnam" },
  { name: "VnExpress Kinh Doanh", url: "https://vnexpress.net/rss/kinh-doanh.rss", cat: "vietnam" },
  { name: "Dân Trí Kinh Doanh", url: "https://dantri.com.vn/kinh-doanh.rss", cat: "vietnam" },
  { name: "Lao Động Kinh Doanh", url: "https://laodong.vn/kinh-doanh.rss", cat: "vietnam" },
  { name: "Nhịp Sống Kinh Tế", url: "https://nhipsongkinhte.toquoc.vn/rss", cat: "vietnam" },
  { name: "Chính Phủ", url: "https://chinhphu.vn/rss", cat: "vietnam" },
  { name: "Ngân Hàng Nhà Nước", url: "https://sbv.gov.vn/rss", cat: "vietnam" },
  { name: "Bộ Tài Chính", url: "https://mof.gov.vn/rss", cat: "vietnam" },
  { name: "Tổng Cục Thống Kê", url: "https://gso.gov.vn/rss", cat: "vietnam" },
];

export const GLOBAL_NEWS_SOURCES: NewsSource[] = [
  { name: "Reuters Business", url: "https://www.reuters.com/business/rss", cat: "global" },
  { name: "Bloomberg Markets", url: "https://feeds.bloomberg.com/markets/news.rss", cat: "global" },
  { name: "CNBC", url: "https://www.cnbc.com/id/100003114/device/rss/rss.html", cat: "global" },
  { name: "Yahoo Finance", url: "https://feeds.finance.yahoo.com/rss/2.0/headline?s=^GSPC", cat: "global" },
  { name: "MarketWatch", url: "https://feeds.marketwatch.com/marketwatch/marketpulse/", cat: "global" },
  { name: "WSJ Markets", url: "https://feeds.a.dj.com/rss/RSSMarketsMain.xml", cat: "global" },
  { name: "Financial Times", url: "https://www.ft.com/rss/world", cat: "global" },
  { name: "Investing.com", url: "https://www.investing.com/rss/news.rss", cat: "global" },
  { name: "Trading Economics", url: "https://tradingeconomics.com/rss", cat: "global" },
  { name: "Federal Reserve", url: "https://www.federalreserve.gov/feeds/press_all.xml", cat: "global" },
  { name: "IMF", url: "https://www.imf.org/en/News/rss-feed", cat: "global" },
  { name: "World Bank", url: "https://www.worldbank.org/en/news/rss", cat: "global" },
  { name: "OPEC", url: "https://www.opec.org/opec_web/en/press_room/press_releases.xml", cat: "global" },
  { name: "EIA", url: "https://www.eia.gov/rss/feed.xml", cat: "global" },
  { name: "CME Group", url: "https://www.cmegroup.com/rss/news.xml", cat: "global" },
  { name: "LBMA", url: "https://www.lbma.org.uk/rss", cat: "global" },
  { name: "Kitco", url: "https://www.kitco.com/rss", cat: "global" },
  { name: "S&P Global", url: "https://www.spglobal.com/rss", cat: "global" },
  { name: "FAO", url: "https://www.fao.org/rss/en/", cat: "global" },
  { name: "World Steel", url: "https://www.worldsteel.org/rss", cat: "global" },
];
