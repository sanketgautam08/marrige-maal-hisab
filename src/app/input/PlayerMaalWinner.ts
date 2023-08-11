export class PlayerMaalWinner{
    private _player: string;
    private _maal: number;
    private _seen: boolean
    private _winner: boolean;

    constructor(player: string, maal:number, seen: boolean, winner: boolean) {
        this._player = player;
        this._maal = maal;
        this._seen = seen;
        this._winner = winner;
    }

    public get player(): string{
        return this._player;
    }

    public set player(player: string) {
        this._player = player;
    }
    public get maal(): number{
        return this._maal;
    }

    public set maal(maal: number) {
        this._maal = maal;
    }
    public get winner(): boolean{
        return this._winner;
    }

    public set winner(winner: boolean) {
        this._winner = winner;
    }
    public get seen(): boolean{
        return this._seen;
    }
    public set seen(seen: boolean) {
        this._seen = seen;
    }

}
