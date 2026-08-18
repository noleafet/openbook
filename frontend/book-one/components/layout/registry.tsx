import { ReactNode } from 'react';

import styled, { css, keyframes } from 'styled-components';

import { RiArrowDropUpLine } from "react-icons/ri";

const slideDown = keyframes`
    from { margin-top: -128px; }
    to { margin-top: 0; }
    `;

const slideUp = keyframes`
    from { margin-top: 0; }
    to { margin-top: -128px; }
    `;

type RegistryInfoProps = {
    $showInfo: boolean;
}

const RegistryInfo = styled.div<RegistryInfoProps>`
    padding: 8px 16px;
    width: 100%;
    z-index: 879;
    background: #29292b;
    color: var(--color-summer-tropical-primary);

    ${({ $showInfo }) => $showInfo
        ? css`
            animation: ${slideDown} 0.5s forwards;
        `
        : css`
            animation: ${slideUp} 0.5s forwards;
        `
    }
    `;

const RegistrySlide = styled.div`
    color: var(--color-summer-tropical-primary);
    background-color: #111;
    padding: 4px;
    z-index: 899;

    &:hover{
        background-color: #19191b;
        color: #fff;
        cursor: pointer;
    }
`;

interface RegistryProps{
    children: ReactNode;
    showInfo: boolean;
    onToggleShowInfo: () => void;
}


export default function Registry({ children, showInfo, onToggleShowInfo }: RegistryProps) {


    return (
        <div className='flex flex-col h-auto w-full justify-end border-b border-gray-700'>
            <RegistryInfo $showInfo={showInfo} className="flex h-32 justify-start gap-x-2">
                {children}
            </RegistryInfo>
            <div className={`flex h-5 items-center justify-center text-3xl ${!showInfo && '-mt-5'}`}>
                {showInfo && <RegistrySlide className='flex h-5 items-center justify-center' onClick={onToggleShowInfo}>
                    <RiArrowDropUpLine />
                </RegistrySlide>}
            </div>

        </div>
    );

};