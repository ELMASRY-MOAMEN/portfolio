import React, { useEffect } from 'react';

export function ArcadeEmbed() {
  useEffect(() => {
    // Réinitialiser les écouteurs d'événements message pour éviter les doublons
    window.removeEventListener('message', onArcadeIframeMessage);
    window.addEventListener('message', onArcadeIframeMessage);
    
    return () => {
      window.removeEventListener('message', onArcadeIframeMessage);
    };
  }, []);
  
  function onArcadeIframeMessage(e: MessageEvent) {
    if (e.origin !== 'https://demo.arcade.software' || !e.isTrusted) return;
    
    const arcadeIframe = document.querySelector(`iframe[src*="R4EdYeJx1ocNFzBr7mvw"]`) as HTMLIFrameElement | null;
    if (!arcadeIframe || !arcadeIframe.contentWindow) return;
    
    if (e.data.event === 'arcade-init') {
      arcadeIframe.contentWindow.postMessage({event: 'register-popout-handler'}, '*');
    }
    
    if (e.data.event === 'arcade-popout-open') {
      arcadeIframe.style.position = 'fixed';
      arcadeIframe.style.zIndex = '9999999';
    }
    
    if (e.data.event === 'arcade-popout-close') {
      arcadeIframe.style.position = 'absolute';
      arcadeIframe.style.zIndex = 'auto';
    }
  }

  return (
    <div dangerouslySetInnerHTML={{ 
      __html: `<div style="position: relative; padding-bottom: calc(50.418410041841% + 41px); height: 0; width: 100%;">
        <iframe 
          src="https://demo.arcade.software/R4EdYeJx1ocNFzBr7mvw?embed&embed_mobile=modal&embed_desktop=modal&show_copy_link=true" 
          title="MAY : Export copilot" 
          frameborder="0" 
          loading="lazy" 
          webkitallowfullscreen 
          mozallowfullscreen 
          allowfullscreen 
          allow="clipboard-write" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; color-scheme: light;"
        ></iframe>
      </div>`
    }} />
  );
} 