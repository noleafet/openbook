import React from 'react';

import styled, { css, keyframes } from 'styled-components';

interface CoverProps{
    covered: boolean;
}

const slideDown = keyframes`
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
    `;

const slideUp = keyframes`
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-100%); opacity: 0; }
    `;

const Cover = styled.div.withConfig({
        shouldForwardProp: (prop) => prop !== 'covered',
    })<CoverProps>`
    position: absolute;
    width: 100%;
    z-index: 999;
    background: var(--summer-tropical-primary);
    color: white;

    overflow: hidden; 

    ${props => (props.covered
        ? css`
            animation: ${slideDown} 0.5s ease-out forwards;
            visibility: visible;
        `
        : css`
            animation: ${slideUp} 0.5s ease-in forwards;
            visibility: hidden;
            transition: visibility 0s 0.5s;
        `
    )}
    `;

const NavItem = styled.div`
    font-size: 32px;
    line-height: 60px;
    font-weight: 500;
    color: #fff;
    text-shadow: -1px 1px 1px #111;

    &:hover {
        color: #111;
        cursor: pointer;
        text-shadow: none;
    }
    `;


export default function CoverNavigation({ covered }: CoverProps) {

    return (
        <Cover covered={covered}>
            <div className="grid grid-cols-6">
                <div className="col-span-5 h-screen border-r border-r-white bg-white/10 flex justify-end">

                    <div className="pr-10 pt-5 text-right">
                        <div className='pb-10'>
                            <NavItem>
                                <div><span>Openbook</span></div>
                                <div className="text-lg leading-none"><span>Book 1: Clairvoyance</span></div>
                            </NavItem>
                        </div>
                        <div>
                            <NavItem>Lorem ipsum dolor sit amet</NavItem>
                            <NavItem>Lorem ipsum dolor sit amet</NavItem>
                        </div>
                    </div>

                </div>
                <div className="col-span-1 h-screen">

                </div>
            </div>
        </Cover>

    );

};