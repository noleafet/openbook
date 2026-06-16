import styled from 'styled-components';
import { TbMaximize, TbMinimize } from "react-icons/tb";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export interface CardConfig {
  title: string;
  url: string;
  iframeWidth?: number;
  iframeHeight?: number;
}

const ToggleButton = styled.div`
  padding-right: 5px;
  cursor: pointer;
  display: inline-block;

  color: var(--summer-tropical-primary);

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

  console.log('id: ' + id + '/' + activeId);
  let isActive, isMaximized: boolean = false;

  if ([0, id].includes(activeId)) {

    isActive = true;
    if (activeId === id) {
      isMaximized = !isMaximized;
    }
  }

  return (
    <Card className={`float-left ${isMaximized ? 'w-full h-full' : 'w-1/3 h-1/2'} ${!isActive && 'hidden'}`}>
      <CardHeader className="flex items-center justify-between text-base pb-1">
        <CardTitle className="inline">{cardConfig.title}</CardTitle>
        <ToggleButton onClick={() => onToggle(id)}>
          {isMaximized ? <TbMinimize /> : <TbMaximize />}
        </ToggleButton>
      </CardHeader>
      <CardContent className="w-full h-full">
        {/* Replace this div with your Facebook embed code */}
        <div className="flex justify-center overflow-hidden rounded-md w-full h-full" data-adapt-container-width="true">
          <iframe
            src="google.com"
            width={cardConfig.iframeWidth}
            className={`h-full ${cardConfig.iframeWidth ?? 'w-full'}`}
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  )
}
