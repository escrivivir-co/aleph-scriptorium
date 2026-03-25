% IoT monitoring template: sensors, thresholds, alerts
:- dynamic sensor/2.
:- dynamic threshold/2.
:- dynamic alert/1.
:- dynamic remediation/2.

% Example data
sensor(temp_room, 31).
sensor(hvac_status, on).
threshold(temp_room, 30).
threshold_delta(temp_room, 5).

% Raise alert when value exceeds threshold
alert(Device) :-
    sensor(Device, Value),
    threshold(Device, Max),
    Value > Max.

% Detect anomalies with optional delta constraint
anomaly(Device, delta_exceeded) :-
    sensor(Device, Value),
    threshold(Device, Max),
    threshold_delta(Device, Delta),
    Diff is Value - Max,
    Diff > Delta.

% Remediation hook: remediation(Device, Action)
remediate(Device, cool_down) :- alert(Device).
remediate(Device, reset) :- anomaly(Device, _).

% Convenience: evaluate all alerts
alerts(List) :- findall(Device, alert(Device), List).
