import { StarWrapper, StarButtonArea, ClickArea } from "./StarRating.styled";

interface StarRatingProps {
  value: number; 
  onChange: (value: number) => void;
}

export default function StarRating({ value, onChange }: StarRatingProps) {
  return (
    <StarWrapper>
      {Array.from({ length: 5 }).map((_, idx) => {
        const leftValue = idx + 0.5;
        const rightValue = idx + 1;
        let fill = "#E0E0E0";
        if (value >= rightValue) fill = "#FFD600";
        else if (value >= leftValue) fill = "url(#half-gradient)";

        return (
          <StarButtonArea key={idx}>
            <ClickArea
              type="button"
              half="left"
              aria-label={`${leftValue}점`}
              onClick={() => onChange(leftValue)}
            />
            <ClickArea
              type="button"
              half="right"
              aria-label={`${rightValue}점`}
              onClick={() => onChange(rightValue)}
            />
            <svg width="32" height="32" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="half-gradient">
                  <stop offset="50%" stopColor="#FFD600" />
                  <stop offset="50%" stopColor="#E0E0E0" />
                </linearGradient>
              </defs>
              <polygon
                points="12,2 15,9 22,9.3 17,14.1 18.5,21 12,17.3 5.5,21 7,14.1 2,9.3 9,9"
                fill={fill}
              />
            </svg>
          </StarButtonArea>
        );
      })}
    </StarWrapper>
  );
}
