import { useState } from 'react';

export function useForceRender() {
    const [, setState] = useState<boolean>(false);

    return () => setState((v) => !v);
}
