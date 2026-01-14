import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForecastCard from '../app/components/ForecastCard';
import { describe, it } from 'node:test';

describe('UI Component Rendering', () => {
  it('should render ForecastCard component with all props correctly', () => {
    const { container } = render(
      <ForecastCard 
        day="Nov 24" 
        condition="Cloudy" 
        humidity={65} 
        temperature={72}
        isToday={true}
      />
    );

    // Should render day text
    expect(screen.getByText('Nov 24')).toBeInTheDocument();
    
    // Should render humidity label
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    
    // Should render humidity value
    expect(screen.getByText(/65%/)).toBeInTheDocument();
    
    // Should render temp label
    expect(screen.getByText('Temp')).toBeInTheDocument();
    
    // Should render weather icon (SVG)
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    
    // Should apply special styling for today
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-white/30');
  });
});
