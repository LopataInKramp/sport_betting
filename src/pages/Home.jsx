import React from "react";
import {Navigate} from "react-router-dom";

const mockMatches = [
    { id: 1, home: "Manchester United", away: "Liverpool", odds: { home: 2.3, draw: 3.1, away: 2.8 } },
    { id: 2, home: "Real Madrid", away: "Barcelona", odds: { home: 2.0, draw: 3.5, away: 3.4 } },
    { id: 3, home: "Juventus", away: "Inter Milan", odds: { home: 2.6, draw: 3.0, away: 2.9 } },
    { id: 4, home: "PSG", away: "Marseille", odds: { home: 1.8, draw: 3.9, away: 4.0 } },
];

export default function Home({ isLoggedIn, betslip, setBetslip }) {

    const addToBetslip = (match, outcome, odd) => {
        if(!isLoggedIn){
            setBetslip([]);
            return;
        }
        setBetslip((prev) => {
            const updated = prev.filter((b) => b.matchId !== match.id);
            updated.push({
                id: match.id + outcome,
                matchId: match.id,
                label: `${match.home} vs ${match.away} (${match.outcome})`,
                odd
            });
            return updated;
        });
    }

    return (
        <main className="main-content">
            <h2 className="main-text">
                {isLoggedIn ? "Select your matches to bet on:" : "Please log in to place bets:"}
            </h2>

            <div className="matches-grid">
                {mockMatches.map((match) => {
                    const selected = betslip.find((b) => b.matchId === match.id);
                    return (
                        <div key={match.id} className="match-card">
                            <h3 className="match-title">{match.home} vs {match.away}</h3>
                            <div className="odds-row">
                                <div
                                    onClick={() => addToBetslip(match, "Home Win", match.odds.home)}
                                    className={`odd-card ${selected?.label.includes("Home Win") ? "selected" : ""}`}
                                >
                                    <span>(1) </span>
                                    <span>{match.odds.home}</span>
                                </div>
                                <div
                                    onClick={() => addToBetslip(match, "Draw", match.odds.draw)}
                                    className={`odd-card ${selected?.label.includes("Draw") ? "selected" : ""}`}
                                >
                                    <span>draw </span>
                                    <span>{match.odds.draw}</span>
                                </div>
                                <div
                                    onClick={() => addToBetslip(match, "Away Win", match.odds.away)}
                                    className={`odd-card ${selected?.label.includes("Away Win") ? "selected" : ""}`}
                                >
                                    <span>(2) </span>
                                    <span>{match.odds.away}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {betslip.length > 0 && (
                <div className="betslip">
                    <h3>Your Betslip</h3>
                    {betslip.map((bet) => (
                        <div key={bet.id} className="bet-item">
                            <span>{bet.label}</span>
                            <span>@ {bet.odd}</span>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );

}