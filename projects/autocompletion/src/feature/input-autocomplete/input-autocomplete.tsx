import "./input-autocomplete.css";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

interface SuggestionMeta {
    display_name: string;
    id: string | number;
}

interface Suggestion {
    meta: SuggestionMeta;
}

const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "X-API-Key":
            "678a284686a46f0838637f0978824393bf4f630e961e1b2fc470cb84de61c018",
    },
};

const defaultSuggestions: Suggestion[] = [];
export const InputAutocomplete = () => {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] =
        useState<Suggestion[]>(defaultSuggestions);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const [cache, setCache] = useState<Record<string, Suggestion[]>>({});
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    console.log(cache);
    useEffect(() => {
        if (!inputValue) {
            setSuggestions(defaultSuggestions);
            return;
        }
        if (cache[inputValue]) {
            setSuggestions(cache[inputValue]);
        } else {
            debounceRef.current = setTimeout(() => {
                fetch(
                    `https://api.peopledatalabs.com/v5/autocomplete?field=company&text=${inputValue}&size=10&titlecase=false&pretty=false`,
                    options,
                )
                    .then((res) => res.json())
                    .then((res) => {
                        const typedData = res.data as Suggestion[];
                        setCache((_cache) => {
                            return {
                                ..._cache,
                                [inputValue]: typedData,
                            };
                        });
                        setSuggestions(typedData);
                    });
            }, 300);
        }

        return () => {
            if (debounceRef.current !== null) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [inputValue]);

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!suggestions.length || !event) {
            return;
        }
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setActiveSuggestion((sug) => {
                    return sug === suggestions.length - 1 ? 0 : sug + 1;
                });
                break;
            case "ArrowUp":
                event.preventDefault();
                setActiveSuggestion((sug) => {
                    return sug === 0 ? suggestions.length - 1 : sug - 1;
                });
                break;
            case "Enter":
                event.preventDefault();
                console.log(suggestions[activeSuggestion]);
                break;
            case "Escape":
                event.preventDefault();
                setActiveSuggestion(-1);
                break;
            default:
                break;
        }
    };
    return (
        <div className="input-autocomplete">
            <input
                type="text"
                className="text"
                onKeyDown={onKeyDown}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {suggestions.length ? (
                <div className="suggestions-box">
                    {suggestions.map(({ meta: suggestion }, index) => {
                        const { display_name, id } = suggestion || {};
                        return (
                            <div
                                key={id}
                                className={
                                    index === activeSuggestion ? "active" : ""
                                }
                            >
                                {display_name}
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};
