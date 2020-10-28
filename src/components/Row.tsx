import React from 'react';
import styled from 'styled-components';

const DivRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Row = ({
    className,
    children,
}: {
    className?: string;
    children: any;
}) => {
    return (
        <DivRow className={`row ${className ? className : ''}`}>
            {children}
        </DivRow>
    );
};

export default Row;
