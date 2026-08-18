import { useRef, useState } from 'react';

import styled from 'styled-components';

import { TbMaximize, TbMinimize } from 'react-icons/tb';
import { RxOpenInNewWindow } from "react-icons/rx";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { openNewWindow } from '@/lib/utils';
import { useProxyPage } from '@/hooks/useProxy';


export interface CardConfig {
  title: string;
  url: string;
  iframeWidth?: number;
  iframeHeight?: number;
}

const ToggleButton = styled.div`
  margin-right: 5px;
  cursor: pointer;
  display: inline-flex;

  color: var(--color-summer-tropical-primary);

  &:hover{
    color: #fff;
  }
`;

type ComponentCardProps = {
  id: number;
  activeId: number | 0;
  cardConfig: CardConfig;
  onToggle: (id: number) => void;
};

export default function LineCard({ id, activeId, cardConfig, onToggle }: ComponentCardProps) {

  const [proxied, setProxied] = useState(false);
  const [activeUrl, setActiveUrl] = useState<string>('');
  const { proxyHtmlContent, isProxyLoading, proxyError } = useProxyPage(activeUrl);

  console.log('id: ' + id + '/' + activeId);

  let isActive, isMaximized: boolean = false;

  if ([0, id].includes(activeId)) {

    isActive = true;
    if (activeId === id) {
      isMaximized = !isMaximized;
    }
  }

  const toggleProxy = () => {
    setProxied(!proxied);

    if (!activeUrl) {
      const proxyEndpoint = `/proxy?url=${encodeURIComponent(cardConfig.url)}`;
      setActiveUrl(proxyEndpoint);
    } else {
      setActiveUrl('');
    }
  };

  return (
    <Card className={`float-left ${isMaximized ? 'w-full h-full' : 'w-1/3 h-1/2'} ${!isActive && 'hidden'}`}>
      <CardHeader className='flex items-center justify-between text-base pb-1'>
        <CardTitle className='inline'>{cardConfig.title}</CardTitle>
        <div>
          <ToggleButton className='border border-r items-center h-5 p-1 relative -top-1' onClick={() => toggleProxy()}>
            <span className={`inline-flex text-xs ${proxied && 'text-white'}`}>Proxy</span>
          </ToggleButton>
          <ToggleButton title='Open in new window' onClick={() => openNewWindow(cardConfig.url)}>
            <RxOpenInNewWindow />
          </ToggleButton>
          <ToggleButton title={`${isMaximized ? 'Minimize' : 'Maximize'}`} onClick={() => onToggle(id)}>
            {isMaximized ? <TbMinimize /> : <TbMaximize />}
          </ToggleButton>
        </div>
      </CardHeader>
      <CardContent className='w-full h-full'>
        {/* Replace this div with your Facebook embed code */}
        <div className='flex justify-center overflow-hidden rounded-md w-full h-full' data-adapt-container-width='true'>
          {proxied ? (
            <>
              {isProxyLoading && <p>Loading proxied content...</p>}
              {proxyError && <p>Error: {proxyError}</p>}
              {proxyHtmlContent && (
                <iframe
                  srcDoc={proxyHtmlContent}

                  width={cardConfig.iframeWidth}
                  className={`h-full ${cardConfig.iframeWidth ?? 'w-full'}`}
                  allowFullScreen={true}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              )}
            </>
          ) : (
            <iframe
              src={cardConfig.url}
              width={cardConfig.iframeWidth}
              className={`h-full ${cardConfig.iframeWidth ?? 'w-full'}`}
              allowFullScreen={true}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
