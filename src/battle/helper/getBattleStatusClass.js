export const getBattleStatusClass = (playerStats) => {
    const death = 'death';
    const dire = 'dire';
    const direThreshold = 0.2;
    let status = '';
    // eslint-disable-next-line array-callback-return
    playerStats.map(({ hp, hpTotal }) => {
        if (status !== death) {
            if (hp <= 0) {
                status = death;
            } else if (hp / hpTotal <= direThreshold) {
                status = dire;
            }
        }
    });
    return status;
};
