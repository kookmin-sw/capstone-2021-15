import React from "react";
import './FavCategory.css';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


function FavCategory(props) {
    return (
        <div className="favCategory">

            <ToggleButtonGroup type="checkbox" defaultValue={[1]} className="mb-2" size="lg">
                <ToggleButton variant="secondary" value={1}>MAKE UP</ToggleButton>
                <ToggleButton variant="secondary" value={2}>LIP</ToggleButton>
                <ToggleButton variant="secondary" value={3}>EYES </ToggleButton>
                <ToggleButton variant="secondary" value={4}>EYES </ToggleButton>
                <ToggleButton variant="secondary" value={5}>CHEEK </ToggleButton>
                <ToggleButton variant="secondary" value={6}>CLOTHES </ToggleButton>
                <ToggleButton variant="secondary" value={7}>NAIL </ToggleButton>
                <ToggleButton variant="secondary" value={8}>HAIR </ToggleButton>
            </ToggleButtonGroup>
            {/*<div className="buttons">
                <MCategoryButtton CName="MAKE UP"></MCategoryButtton>
                <MCategoryButtton CName="LIP"></MCategoryButtton>
                <MCategoryButtton CName="EYES"></MCategoryButtton>
                <MCategoryButtton CName="CHEEK"></MCategoryButtton>
                <MCategoryButtton CName="CLOTHES"></MCategoryButtton>
                <MCategoryButtton CName="NAIL"></MCategoryButtton>

            </div>*/}
        </div>
    )
}

export default FavCategory;