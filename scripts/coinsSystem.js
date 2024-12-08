class coinsSystem 
{
    rings = 0;
    static current = null;

    constructor() 
    {
        if (!localStorage.getItem('rings')) localStorage.setItem('rings', '0');
        console.trace(localStorage.getItem('rings'));

        this.rings = parseInt(localStorage.getItem('rings'));

        // current = this;
    }

    /**
     * get current rings count
     * @returns Number
     */
    getRings()
    {
        return this.rings;
    }
    
    /**
     * add rings on yur account
     * 
     * @param {Number} params 
     */
    addRings(params)
    {
       this.rings += params;
       localStorage.removeItem('rings');
       localStorage.setItem('rings', String(this.rings));
       console.trace(localStorage.getItem('rings'));
    }
}

coinsSystem.current = new coinsSystem();
