import styled from 'styled-components';

import { PiGithubLogoDuotone, PiNotebookDuotone, PiNotebookFill } from 'react-icons/pi';
import LoginForm from '@/components/forms/login-form';

const HeaderLogoBox = styled.div`
    color: var(--color-summer-tropical-primary);
    background-color: #111;
    padding: 4px 16px 6px 16px;
    line-height: 24px;
    width: 100%;
    z-index: 889;
    cursor: pointer;
  
    span.logo:hover{
        color: #fff;
    }
`;

const CoverToggle = styled.span`
    color: var(--color-summer-tropical-primary);
    cursor: pointer;
    
    span{
        color: #eee;
    }
    
    &:hover, span:hover {
        color: #fff;
    }
    `;


interface HeaderInfo {
    showCover: boolean;
    onToggleShowCover: () => void;
}

export default function Header({ showCover, onToggleShowCover }: HeaderInfo) {


    return (
        <div className='flex flex-col h-auto w-full justify-end border-b border-gray-700'>
            <HeaderLogoBox className='flex h-10 items-center justify-between text-base'>
                <span className='logo text-lg'>Openbook</span>
                <span className='flex gap-x-4 text-base items-center'>
                    <span><LoginForm /></span>
                    <span title='Github'><PiGithubLogoDuotone /></span>
                    <CoverToggle title='Cover' onClick={onToggleShowCover}>
                        {showCover ? <PiNotebookFill /> : <PiNotebookDuotone />}
                    </CoverToggle>
                </span>
            </HeaderLogoBox>
        </div>
    );

};