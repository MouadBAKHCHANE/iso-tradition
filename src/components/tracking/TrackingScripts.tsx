import Script from "next/script";

interface MarketingData {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  googleSearchConsoleVerification?: string;
  facebookPixelId?: string;
  tiktokPixelId?: string;
  linkedinPartnerId?: string;
  googleAdsId?: string;
  snapchatPixelId?: string;
  pinterestTagId?: string;
  headScripts?: string;
  bodyStartScripts?: string;
  bodyEndScripts?: string;
}

export function TrackingHead({ data }: { data: MarketingData | null }) {
  if (!data) return null;

  return (
    <>
      {/* Google Analytics 4 */}
      {data.googleAnalyticsId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${data.googleAnalyticsId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${data.googleAnalyticsId}');`}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {data.googleTagManagerId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${data.googleTagManagerId}');`}
        </Script>
      )}

      {/* Google Search Console */}
      {data.googleSearchConsoleVerification && (
        <meta name="google-site-verification" content={data.googleSearchConsoleVerification} />
      )}

      {/* Meta (Facebook) Pixel */}
      {data.facebookPixelId && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${data.facebookPixelId}');fbq('track','PageView');`}
        </Script>
      )}

      {/* TikTok Pixel */}
      {data.tiktokPixelId && (
        <Script id="tt-pixel" strategy="afterInteractive">
          {`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${data.tiktokPixelId}');ttq.page();}(window,document,'ttq');`}
        </Script>
      )}

      {/* LinkedIn Insight Tag */}
      {data.linkedinPartnerId && (
        <Script id="li-insight" strategy="afterInteractive">
          {`_linkedin_partner_id="${data.linkedinPartnerId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);`}
        </Script>
      )}

      {/* Google Ads */}
      {data.googleAdsId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${data.googleAdsId}`} strategy="afterInteractive" />
          <Script id="gads" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${data.googleAdsId}');`}
          </Script>
        </>
      )}

      {/* Snapchat Pixel */}
      {data.snapchatPixelId && (
        <Script id="snap-pixel" strategy="afterInteractive">
          {`(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');snaptr('init','${data.snapchatPixelId}',{});snaptr('track','PAGE_VIEW');`}
        </Script>
      )}

      {/* Pinterest Tag */}
      {data.pinterestTagId && (
        <Script id="pin-tag" strategy="afterInteractive">
          {`!function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");pintrk('load','${data.pinterestTagId}');pintrk('page');`}
        </Script>
      )}

      {/* Custom head scripts */}
      {data.headScripts && (
        <div dangerouslySetInnerHTML={{ __html: data.headScripts }} />
      )}
    </>
  );
}

export function TrackingBodyStart({ data }: { data: MarketingData | null }) {
  if (!data) return null;

  return (
    <>
      {/* GTM noscript */}
      {data.googleTagManagerId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${data.googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      )}
      {data.bodyStartScripts && (
        <div dangerouslySetInnerHTML={{ __html: data.bodyStartScripts }} />
      )}
    </>
  );
}

export function TrackingBodyEnd({ data }: { data: MarketingData | null }) {
  if (!data?.bodyEndScripts) return null;
  return <div dangerouslySetInnerHTML={{ __html: data.bodyEndScripts }} />;
}
