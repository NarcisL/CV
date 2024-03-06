package isp.lab10.exercise1;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TakeoffCommand extends AtcCommand{
    private int altitude;
}
