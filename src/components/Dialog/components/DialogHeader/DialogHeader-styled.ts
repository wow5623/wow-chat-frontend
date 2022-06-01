import styled from 'styled-components';
import Typography from 'antd/lib/typography';
import Avatar from 'antd/lib/avatar';
import {Colors} from '../../../../theme/colors';

const HEADER_Z_INDEX = 1000;

const Wrapper = styled.header`
    background: ${Colors.dialog.headerBackground};
    padding: 15px;
    box-shadow: 0 5px 40px rgba(0,0,0,0.85);
    z-index: ${HEADER_Z_INDEX};
    display: flex;
    justify-content: center;
    position: relative;
`

const BackButtonWrapper = styled.div`
    position: absolute;
    left: 20px;
`

const UserInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const UserName = styled(Typography.Title)`
    color: white !important;
    margin: 0 !important;
`

const UserAvatar = styled(Avatar)`
    color: ${Colors.primary};
    font-weight: bold !important;
`

export const Styled = {
    Wrapper,
    UserName,
    UserInfo,
    UserAvatar,
    BackButtonWrapper,
}

