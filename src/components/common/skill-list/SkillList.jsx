import React from "react";

const styles = {
    skills: {
        display: "inline",
        fontSize: "16px",
        fontWeight: 500
    },
    skill: {
        color: "#fff",
        backgroundColor: "#4096ee",
        border: "1px solid black",
        boxShadow: "2px 3px #8888884f",
        borderRadius: "2px",
        fontWeight: 500,
        display: "inline-block",
        margin: "5px 10px 5px auto",
        padding: "5px 15px"
    }
};

const SkillList = props => {
    const { skills, guideText } = props;
    return (
        <>
            {skills && (
                <>
                    {guideText && <div style={styles.skills}>Required Skills - </div>}
                    {skills.map((skill, i) => {
                        return (
                            <div style={styles.skill} key={i}>
                                {skill}
                            </div>
                        );
                    })}
                </>
            )}
        </>
    );
};

export default SkillList;
